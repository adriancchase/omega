/**
 * Imports an HTML source file into an HTML destination file by replacing a script element 
 * in the destination file with a div containing the full text of the HTML source file.
 * 
 * @param {string} htmlSourceFile Name of HTML source file to be imported (not the full path).
 * @param {string} destinationScriptId ID of the HTML script element to be replaced in the destination file.
 * @param {string[]} divClassList Optional: Classes to add to the div, which is made parent to the imported HTML text.
 * @returns {Promise<void>}
 * 
 * @example Create file called sidebar.js which calls importHtml('sidebar.html', 'createSidebar', ['col-2', 'p-3', 'bg-light']) --
 *          then add <script type="module" id="createSidebar" src="sidebar.js"></script> to the destination HTML file.
 */
export function importHtml(htmlSourceFile, destinationScriptId, divClassList = []) {
    const htmlSourcePath = `../../html/${htmlSourceFile}`;
    const addToDom = (htmlSourceText) => {
        // Script element to be replaced in the destination HTML file.
        const scriptElement = document.querySelector(`script#${destinationScriptId}`);
        // New element to replace the script.
        const replacementElement = document.createElement('div');
        replacementElement.innerHTML = htmlSourceText;
        if (divClassList.length) {
            replacementElement.classList.add(...divClassList);
        }
        
        if (scriptElement && scriptElement.parentNode) {
            scriptElement.parentNode.replaceChild(replacementElement, scriptElement);
        } else {
            console.error(`Could not import '${htmlSourceFile}' : the script '${destinationScriptId}' was not found or has no parent.`);
        }
    };

    return fetch(htmlSourcePath).then(res => res.text()).then(addToDom);
}