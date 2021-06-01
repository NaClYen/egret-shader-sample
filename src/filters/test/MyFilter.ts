class MyFilter {
    /** vertex script */
    private static vertScript: string;
    /** fragment script */
    private static fragScript: string;
    /** 主要的濾鏡物件 */
    private static filter: egret.CustomFilter;
    /** 掛濾鏡的目標物件 */
    private static target: egret.DisplayObject;

    /** 讀取 shader script */
    public static async loadScript() {
        const vertFilePath = "./src/filters/test/vert.glsl";
        const fragFilePath = "./src/filters/test/frag.glsl";

        const loadFileText = (file: string, cb: (text: string) => void) => {
            return fetch(file)
                .then((r) => r.text())
                .then(cb);
        };

        // load scripts
        await loadFileText(vertFilePath, (t) => (MyFilter.vertScript = t));
        await loadFileText(fragFilePath, (t) => (MyFilter.fragScript = t));

        // console.log(`vertScript: ${this.vertScript}`);
        // console.log(`fragScript: ${this.fragScript}`);
    }

    public static init(target: egret.DisplayObject) {
        this.target = target;
        this.filter = new egret.CustomFilter(this.vertScript, this.fragScript, { brightness: 0 });
    }

    public static get enable() {
        return this.target.filters && this.target.filters.length > 0;
    }

    public static set enable(val: boolean) {
        if (val) {
            this.target.filters = [this.filter];
        } else {
            // filters 不能為空陣列, 會觸發 error(驗證於 5.3.10 & 5.4.1).
            this.target.filters = undefined;
        }
    }
}
