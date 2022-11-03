fetch('sidebar.html')
    .then(response => response.text())
    .then(addSidebarToDom);


function addSidebarToDom(sidebarHtmlText) {
    const scriptElement = document.querySelector('script#createSidebar');
    const replacementElement = document.createElement('div');
    replacementElement.classList.add('col-2', 'p-3', 'bg-light');
    replacementElement.innerHTML = sidebarHtmlText;
    scriptElement.parentNode.replaceChild(replacementElement, scriptElement);
}