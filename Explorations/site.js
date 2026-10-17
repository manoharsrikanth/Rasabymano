const previews = {"inquiry": {"label": "Inquiry", "title": "Art, philosophy & technology", "copy": "A studio for thinking aloud, questioning assumptions, and giving ideas physical form. AI, cameras, electronics, and making tools become ways to investigate what matters."}, "vision": {"label": "Vision", "title": "Landscape, objects & cultural memory", "copy": "Asian and South Asian cultural pieces, sculpture, planting, photography, and the spaces between them. A personal exploration of how an imagined scene becomes a place to inhabit."}, "care": {"label": "Care", "title": "Hospitality & shared experience", "copy": "The artist imagines an experience; a guest brings it to life in their own way. Hosting, a shared table, or a conversation can reveal something that was never anticipated."}, "stewardship": {"label": "Stewardship", "title": "An evolving practice", "copy": "Cooking, tending a garden, maintaining a space, and improving a welcome all reward patient iteration. Sustainability means caring for materials, resources, and the human energy that keeps the practice alive."}, "sharing": {"label": "Generosity", "title": "Making, learning & conversation", "copy": "A shared table, a whiteboard, tools, and time to explore. The intention is to share knowledge along the way and invite younger people into the practice of inquiry, observation, and making. Visits and conversations are by invitation."}, "about": {"label": "A hidden experimental presentation", "title": "Questions, given room.", "copy": "A visual study of RĀSA’s personal explorations. The still life, optical experiment, landscape, culinary workspace, and studio are AI-generated concepts, rather than photographs of completed or bookable spaces. The porch and Airbnb home photographs are actual images. Dedicated exploration pages will follow; visits, showings, and conversations are by invitation."}};
const dialog=document.querySelector('#explore-dialog');
let opener;
document.querySelectorAll('[data-explore]').forEach(button=>button.addEventListener('click',()=>{
 const item=previews[button.dataset.explore]; opener=button;
 document.querySelector('#dialog-label').textContent=item.label;
 document.querySelector('#dialog-title').textContent=item.title;
 document.querySelector('#dialog-copy').textContent=item.copy;
 document.querySelector('#dialog-note').hidden=button.dataset.explore==='about';
 dialog.showModal();
}));
dialog.querySelectorAll('.close,.close-text').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>opener?.focus());
