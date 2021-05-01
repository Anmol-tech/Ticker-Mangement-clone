function initTickets() {
	let allTickets = JSON.parse(localStorage.getItem("allTickets"));
	if (!allTickets) {
		localStorage.setItem("allTickets", JSON.stringify([]));
		return;
	}
	// if tickets are present
	for (let i = 0; i < allTickets.length; i++) {
		let ticketObject = allTickets[i];
		addTicketToUI(ticketObject);
	}
	console.log("tickets found !!!");
}
initTickets();

function addTicketToUI(ticketObject) {
	let { ticketId, ticketText, ticketFilter } = ticketObject;
	let ticket = document.createElement("div");
	ticket.classList.add("ticket");
	ticket.innerHTML = `<div id = "${ticketId}"class="ticket-head ${ticketFilter}"></div>
	<div class="ticket-content">
        <div class= "ticket-info">
		<div class="ticket-code">${ticketId}</div>
		<div class="ticket-delete"><i ticket-id = "${ticketId}" class="fas fa-trash-alt "></i></div>
        </div>
		<div class="ticket-context-text">${ticketText}</div>
	</div>`;

	ticket
		.querySelector(".ticket-head")
		.addEventListener("click", changeTicketFilter);
	ticket
		.querySelector(".ticket-delete")
		.addEventListener("click", (e) => deletTicket(e, ticket));
	ticketContent.append(ticket);
}

function filterTicket(filterColor) {
	let allTickets = JSON.parse(localStorage.getItem("allTickets"));
	let filterTickets = allTickets.filter((ticketObj) => {
		return ticketObj.ticketFilter == filterColor;
	});

	ticketContent.innerHTML = "";
	for (let x = 0; x < filterTickets.length; x++) {
		addTicketToUI(filterTickets[x]);
	}
}
