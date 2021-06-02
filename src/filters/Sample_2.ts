/**
 * 為了方便編寫, 加入動態載入機制
 */
class Sample_2 {
    public static async applyFilter(target: egret.DisplayObject) {
        const vertFilePath = "./src/filters/test/vert.glsl";
        const fragFilePath = "./src/filters/test/frag.glsl";

        const loadFileText = (file: string, cb: (text: string) => void) => {
            return fetch(file)
                .then((r) => r.text())
                .then(cb);
        };

        // load scripts
        let vertScript: string;
        let fragScript: string;
        await loadFileText(vertFilePath, (t) => (vertScript = t));
        await loadFileText(fragFilePath, (t) => (fragScript = t));

        // console.log(`vertScript: ${vertScript}`);
        // console.log(`fragScript: ${fragScript}`);

        // 產生自製濾鏡
        const filter = new egret.CustomFilter(vertScript, fragScript, { brightness: 0 });
        // 套用濾鏡
        target.filters = [filter];
    }
}
