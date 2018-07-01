import dat from 'dat-gui';
import conf from './conf';

class Param {
    constructor () {
        this.base = {
            bgColor: {value: '#ffdcf8'}
        }
        this.mesh = {
            geometry: {value: 'Box', list: ['Box', 'Circle', 'Corn', 'Tetrahedron', 'Torus']},
            baseColor: {value: '#49bbbb'}
        };
        if(!conf.debugMode) return;
        this.init();
    }
    init() {
        this.gui = new dat.GUI();
        this.addGUI(this.base, 'Base');
        this.addGUI(this.mesh, 'Mesh');
        document.querySelector('.dg').style.zIndex = 9999;
    }
    addGUI (obj, folderName) {
        const folder = this.gui.addFolder(folderName);
        for(let key in obj) {
            let val = obj[key];
            let g;
            if(key.indexOf('Color') > 0) {
                g = folder.addColor(val, 'value').name(key);
            }else {
                console.log(val);
                if(val.list) {
                    g = folder.add(val, 'value', val.list).name(key);
                } else {
                    g = folder.add(val, 'value', val.min, val.max).name(key);
                }
            }
            val.gui = g;
        }
    }
}

export default new Param();