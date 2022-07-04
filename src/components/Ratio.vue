<template>
  <div class="w-full mx-auto text-black dark:text-white">
    <div class="calculate mx-auto box overflow-hidden">
      <div class="calculate-c">
        <div>
          <span>常见比例</span>
          <ul id="calculator-type">
            <li><a class="c-active">16:9</a></li>
            <li><a>21:9</a></li>
            <li><a>4:3</a></li>
            <li><a>2:1</a></li>
            <li class="customize"><a>自定<input type="number" onkeyup="isCustomize()">:<input type="number"
                  onkeyup="isCustomize()"></a></li>
          </ul>
        </div>
        <div class="calculator" id="calculator">
          <section id="width">
            <h1 style="color: rgb(255, 255, 255); font-weight: 300;">宽</h1>
            <input style="opacity: 0.3;" name="width" onkeyup="onKeyUp(event, this, 0)" value="" type="text"
              placeholder="输入" onfocus="onFocus(this)" onblur="onBlur(this)">
          </section>
          <section id="height">
            <h1 style="color: rgb(255, 255, 255); font-weight: 300;">高</h1>
            <input style="opacity: 0.3;" name="height" onkeyup="onKeyUp(event, this, 1)" value="" type="text"
              placeholder="输入" onfocus="onFocus(this)" onblur="onBlur(this)">
          </section>
          <span>X</span>
        </div>
        <p>MMOO.FUN制作</p>
      </div>

    </div>
  </div>
</template>

<script>
import i18n from '../i18n';
import designJson from '../assets/json/design.json';


export default {
  name: 'Ratio',
  data() {
    let commonRatio = [{   //常见比例
      w: 16, h: 9
    }, {
      w: 21, h: 9
    }, {
      w: 4, h: 3
    }, {
      w: 2, h: 1
    }, {
      w: 0, h: 0
    }]
    let scale = commonRatio[0].w / commonRatio[0].h;

    return {
      datas: JSON.parse(JSON.stringify(designJson)),
      toolsTabs: ['ratio', 'ratio'],
      
    }
  },
  methods: {
    calculate(num, ops) {
      let result;
      if (num === 'undefined') {
        return;
      }

      if (num > 0 && ops === 0) {
        result = num / scale;
        return Math.round(result);
      }

      if (num > 0 && ops === 1) {
        result = num * scale;
        return Math.round(result);
      }
    }
  },
}
</script>


<style lang="scss" scoped>

.calculate {
  width: 100%;
  /* padding: 10px 20px; */
}

.calculate-c {
  padding: 60px 20px;
  background: #041828;
}

.calculate-c .customize input {
  width: 60px;
  height: 1.5rem;
  margin: 0 10px;
}

.calculate-c .customize input::-webkit-outer-spin-button,
.calculate-c .customize input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.calculate-c .customize input[type="number"] {
  -moz-appearance: textfield;
}

.calculate-c div {
  display: flex;
  justify-content: center;
  color: #fff;
  margin-bottom: 40px;
}

.calculate-c p {
  display: inline-block;
  margin: 0;
  width: 100%;
  color: #fff;
  font-size: 1rem;
  text-align: center;
}

.calculate-c span {
  font-size: 1.5rem;
}

.calculate-c ul {
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  list-style: none;

}

.calculate-c ul a {
  padding: 5px 20px;
  color: #fff;
  cursor: pointer;
}

.c-active {
  background-color: #fff;
  color: #041828 !important;
}

.calculator {
  position: relative;
  display: flex;
  justify-content: center;
}

.calculator section {
  padding: 60px;
  max-width: 400px;
}

/* .calculator section:first-child {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
} */

.calculator section h1 {
  color: rgb(255, 255, 255);
  font-weight: 100;
  font-size: 1em;
  text-transform: uppercase;
  text-align: center;
}

.calculator section input {
  width: 100%;
  background: none;
  border: 0;
  font-weight: 700;
  font-size: 3em;
  text-align: center;
  outline: none;
  color: #fff;
}

.calculator section input::-webkit-input-placeholder {
  color: #fff;
}

.calculator section input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}

.calculator section input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}

.calculator section input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff;
}

.calculator span {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-left: -30px;
  margin-top: -30px;
  text-align: center;
  color: #fff;
  font-size: 40px;
  line-height: 60px;
  background-color: #041828;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.container {
    padding: 120px 12px 0 12px;
}
</style>