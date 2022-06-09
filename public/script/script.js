const createForm=document.querySelector(".create-form");
const videoDescription=document.querySelector(".video-description");
const lists=document.querySelector(".lists");
const addMoreBtn=document.querySelector(".add-btn");
const deleteBtns=document.querySelectorAll(".fa-trash");
const editBtns=document.querySelectorAll(".fa-pen");
const crossBtns=document.querySelectorAll(".fa-times");
const confirmBtns=document.querySelectorAll(".confirm-btn");
const videoEditSec=document.querySelector(".video-edit-sec");
const listEditSec=document.querySelector(".list-edit-sec");
const editName=document.querySelector(".edit-name");
const editActive=document.querySelector(".edit-active");
const editDescription=document.querySelector(".edit-description");
const editListName=document.querySelector(".edit-list-name");
const editListLink=document.querySelector(".edit-list-link");

const submitData=e=>{
	e.preventDefault();

	let listData=[];
	let videoName=document.querySelector(".video-name");
	let videoActive=document.querySelector(".video-active");
	let indLists=document.querySelectorAll(".ind-list");
	let listName=document.querySelectorAll(".list-name");
	let listLink=document.querySelectorAll(".list-link");

	indLists.forEach((list,i)=>{
		listData.push({
			name: listName[i].value,
			link: listLink[i].value
		})
	})

	fetch(`/create`, {
      method: `POST`,
      body: JSON.stringify({
        name: videoName.value,
        active: videoActive.checked,
        description: videoDescription.value,
        listData
      }),
      headers: { 'Content-type': `application/json; charset=UTF-8` },
    }).then((response) => response.json())
}

const handleAdd=()=>{
	const indList=document.createElement("div");
	indList.className="ind-list";

	indList.innerHTML=`<div class="list-name-sec">
						<label>Name</label><br>
						<input class="list-name" type="text" placeholder="Enter a video list name..." required/>
					</div>
					<div class="list-link-sec">
						<label>Link</label><br>
						<input class="list-link" type="text" placeholder="Enter a link..." required/>
					</div>`;
	lists.appendChild(indList)
}

const handleDelete=e=>{
	if(e.target.getAttribute("type")=="video"){
		e.target.parentElement.parentElement.parentElement.parentElement.remove();
	}
	else if(e.target.getAttribute("type")=="list"){
		e.target.parentElement.parentElement.parentElement.remove();	
	}
}

const handleEdit=e=>{
	if(e.target.getAttribute("type")=="video"){
		videoEditSec.style.display="block";
		listEditSec.style.display="none";

		editName.value=e.target.parentElement.previousElementSibling.innerText;
		editDescription.value=e.target.parentElement.parentElement.nextElementSibling.innerText;

		if(e.target.previousElementSibling.lastElementChild.classList.contains('fa-check'))	editActive.checked=true;	
		else editActive.checked=false;
	}
	else if(e.target.getAttribute("type")=="list"){
		videoEditSec.style.display="none";
		listEditSec.style.display="block";	

		editListName.value=e.target.parentElement.previousElementSibling.innerText;
		editListLink.value=e.target.parentElement.parentElement.nextElementSibling.innerText;
	}
}

const displayNone=()=>{
	videoEditSec.style.display="none";
	listEditSec.style.display="none";
}

// eventListeners
createForm.addEventListener("submit",submitData);
addMoreBtn.addEventListener("click",handleAdd);
deleteBtns.forEach(deleteBtn=>{
	deleteBtn.addEventListener("click",handleDelete)
})
editBtns.forEach(editBtn=>{
	editBtn.addEventListener("click",handleEdit)
})
crossBtns.forEach(crossBtn=>{
	crossBtn.addEventListener("click",displayNone)
})
confirmBtns.forEach(confirmBtn=>{
	confirmBtn.addEventListener("click",displayNone)
})