<template>
  <div class="w-full mx-auto text-slate-500">
    <div class="calculate bg-slate-100 mx-auto box overflow-hidden">
      <div class="calculate-c">

        <div class="bg-slate-50 p-6 flex gap-x-3 overflow-x-auto">
          <textarea 
            v-model="inputValue" 
            :placeholder="$t('time.eg')"
            rows="4" 
            cols="50"
            class="w-full block rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-slate-300 leading-1.5"
          ></textarea>
          
        </div>

        <div class="flex gap-x-3 py-6 px-6 items-center">
          <p class="w-4/5">{{ $t("time.result") }}: {{ result }}</p>
          <button 
              class="w-1/5 px-2 py-1 text-center flex justify-center bg-white active:bg-slate-300 rounded-md cursor-pointer text-slate-600 border-2 border-slate-500"
              @click="calculateTime"
            >
                <span class="block">
                  {{ $t("time.caculate") }}
                </span>
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Time',
  data() {
    return {
      inputValue: '',
      result: '',
    };
  },
  methods: {
    parseTime(timeStr) {
      const parts = timeStr.split('.').map(Number).reverse();
      let minutes = parts[0] || 0;
      let hours = parts[1] || 0;
      let days = parts[2] || 0;

      // Handle overflow in minutes and hours
      if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes %= 60;
      }
      if (hours >= 24) {
        days += Math.floor(hours / 24);
        hours %= 24;
      }

      return { days, hours, minutes };
    },
    formatTime({ days, hours, minutes }) {
      let result = '';
      if (days > 0) result += `${days}.`;
      result += `${hours}.${minutes}`;
      return result;
    },
    addTimes(time1, time2) {
      const totalMinutes = time1.minutes + time2.minutes;
      const totalHours = time1.hours + time2.hours + Math.floor(totalMinutes / 60);
      const totalDays = time1.days + time2.days + Math.floor(totalHours / 24);

      return {
        days: totalDays,
        hours: totalHours % 24,
        minutes: totalMinutes % 60,
      };
    },
    subtractTimes(time1, time2) {
      const totalMinutes1 = time1.days * 24 * 60 + time1.hours * 60 + time1.minutes;
      const totalMinutes2 = time2.days * 24 * 60 + time2.hours * 60 + time2.minutes;
      const diffMinutes = totalMinutes1 - totalMinutes2;

      const days = Math.floor(diffMinutes / (24 * 60));
      const hours = Math.floor((diffMinutes % (24 * 60)) / 60);
      const minutes = diffMinutes % 60;

      return { days, hours, minutes };
    },
    calculateTime() {
      const input = this.inputValue.replace(/\s+/g, ''); // Remove all whitespace
      const operations = input.match(/([+-]?\d+(\.\d+){0,2})/g);
      if (!operations) {
        this.result = 'Invalid input';
        return;
      }

      let totalTime = this.parseTime(operations[0]);

      for (let i = 1; i < operations.length; i++) {
        const operator = operations[i][0];
        const timeStr = operations[i].slice(1);
        const parsedTime = this.parseTime(timeStr);

        if (operator === '+') {
          totalTime = this.addTimes(totalTime, parsedTime);
        } else if (operator === '-') {
          totalTime = this.subtractTimes(totalTime, parsedTime);
        }
      }

      this.result = this.formatTime(totalTime);
    },
  },
};
</script>

<style lang="scss" scoped>

input[type=number] {
  -moz-appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.ratio-item {
  margin-right: 8px;
  margin-bottom: 8px;

  &:last-child {
    margin-right: 0;
  }

}

.container {
    padding: 120px 12px 0 12px;
}

</style>