import { h, render } from 'vue';

// import MyDialogConstructor from './MyDialog.vue';
import Flower_Pop from '../components/Flower_Pop.vue';

let uid = 1000;
let popNum = -1;
let timeout = 2000;

export const showDialog = function showDialog(flower, num, fType) {
    const container = document.getElementById('fpop');

    popNum++;
    // console.log('++', popNum);
    setTimeout(() => {
        const node = document.createElement('div');
        let vnode = h(Flower_Pop, { zIndex: uid++, data: num, fType: fType, flower: flower });

        render(vnode, node);
        vnode.component.proxy.show();
        container.appendChild(node);

        setTimeout(() => {
            render(null, node);
            container.removeChild(node);
            popNum--;
            // console.log('--', popNum);
        }, 5000);
    }, timeout * popNum);



};
