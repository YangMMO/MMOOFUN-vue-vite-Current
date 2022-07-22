import { h, render } from 'vue';

// import MyDialogConstructor from './MyDialog.vue';
import Flower_Pop from '../components/Flower_Pop.vue';

let uid = 1000;

export const showDialog = function showDialog(flower, num, fType) {
    const container = document.getElementById('fpop');
    const node = document.createElement('div');
    let vnode = h(Flower_Pop, { zIndex: uid++, data: num, fType: fType, flower: flower });

    render(vnode, node);
    vnode.component.proxy.show();
    container.appendChild(node);

    setTimeout(() => {
        render(null, node);
        container.appendChild(node);
    }, 10000);

};
