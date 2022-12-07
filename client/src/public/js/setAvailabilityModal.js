import {importHtml} from './utils/htmlUtils.js';


importHtml('setAvailabilityModal.html', 'importAvailabilityModal').then(()=> {
    document.getElementById('closeAvailabilityModal').addEventListener('click', reset);
    document.getElementById('setAvailabilityBtn').addEventListener('click', addElementToList);
});

let listCount = 0;

function reset() {

}

function addAvailabilityItem() {
    const startDate = document.getElementById('start-time-availability').value;
    const endDate = document.getElementById('end-time-availability').value;


}

function addElementToList() {
    const template = document.getElementById('availability-item-template');
    const list = document.getElementById('availability-group-container');
    
    const listItem = template.content.cloneNode(true);
    const div = listItem.querySelector('#li1');
    div.id = `li${listCount}`;
    console.log("Keys in method: " + Object.keys(listItem));
    listItem.querySelector('.btn-primary').addEventListener('click', () => {document.getElementById("li"+listCount).remove();});
    list.append(listItem);
    listCount++;
}
