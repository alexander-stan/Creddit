import * as React from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";

const Styles = styled.div`
	* {
		margin: 0;
		padding: 0;
	}
	background-color: #293225;
	@font-face {
		font-family: formFont;
		src: url(JejuGothic-Regular.ttf);
	}

	svg {
		display: inline-block;
	}

	.red {
		color: red;
	}

	.container {
		display: flex;
		gap: 3rem;
		flex-direction: row;
		min-height: 100%;
		margin: 50px 50px;
		border: 10px solid black;
		flex-wrap: wrap;
	}

	.QuickActions {
		display: flex;
		flex-direction: column;
		height: 70%;
		background-color: #e0e0e0;
		text-align: center;
		border-radius: 8px;
		font-family: formFont;
	}

	.header {
		display: flex;
		width: 100%;
		height: 50px;
		background-color: #c0c0c0;
		text-align: left;
		border-radius: 8px;
		font-family: formFont;
		box-shadow: 0px 4px 5px #afaeae;
	}
	.summary {
		border: solid red;
		min-width: 10rem;
		display: flex;
		flex-direction: column;
		height: 70%;
		background-color: #e0e0e0;
		text-align: center;
		border-radius: 8px;
		gap: 1em;
		font-family: formFont;
		padding-bottom: 30px;
		width: 70rem;
	}

	.myAccounts {
		padding: 20px;
		font-family: formFont;
		text-align: center;
		font-size: 19px;
	}
	.hover-underline-animation {
		position: relative;
	}

	.hover-underline-animation:hover {
		cursor: pointer;
	}
	body {
		max-width: 100%;
		margin: 0 auto;
	}
	.hover-underline-animation::after {
		content: "";
		position: absolute;
		width: 85%;
		transform: scaleX(0);
		height: 2px;
		bottom: 0;
		left: 0;
		color: #74992e;
		background-color: #74992e;
		transform-origin: bottom right;
		transition: transform 0.25s ease-out;
	}

	.hover-underline-animation:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
	.tabs {
		margin-top: 1rem;
		display: flex;
		flex-direction: row;
		margin-right: 20px;
		margin-left: 20px;
		gap: 0.5rem;
	}

	button {
		/* Variables */
		--button_radius: 0.75em;
		--button_color: #e8e8e8;
		--button_outline_color: #74992e;
		font-size: 17px;
		font-weight: bold;
		border: none;
		border-radius: var(--button_radius);
		background: var(--button_outline_color);
	}

	.button_top {
		display: block;
		box-sizing: border-box;
		border: 2px solid var(--button_outline_color);
		border-radius: var(--button_radius);
		padding: 0.75em 1.5em;
		background: var(--button_color);
		color: var(--button_outline_color);
		transform: translateY(-0.2em);
		transition: transform 0.1s ease;
	}

	button:hover .button_top {
		/* Pull the button upwards when hovered */
		cursor: pointer;
		transform: translateY(-0.33em);
	}

	button:active .button_top {
		/* Push the button downwards when pressed */
		transform: translateY(0);
	}

	.desc {
		display: flex;
		margin: 0rem 7rem 0rem 4rem;
		min-width: 10rem;
		gap: 1em;
		text-decoration: underline;
		text-underline-position: under;
		flex-direction: row;
		justify-content: space-between;
	}
	.item2 {
		margin-left: 1rem;
	}

	.creditDisc {
		margin: 0rem 4rem 0rem 4rem;
		text-align: right;
		text-decoration: underline;
		text-underline-position: under;
	}
	.listOfAccounts {
		display: flex;
		flex-direction: column;
		align-self: center;
		width: 94%;
		height: 60%;
		background-color: #d1d1d1;
		text-align: center;
		border-radius: 8px;
		font-family: formFont;
	}
	option:hover {
		background-color: #74992e;
	}

	input[type="text"] {
		border-radius: 8px;
		text-align: center;
		font-size: 15px;
		padding-left: 5rem;
		width: 28.5rem;
		padding: 12px 20px;
		margin: 8px 0;
		box-sizing: border-box;
		font-family: formFont;
	}
	select {
		border-radius: 8px;
		text-align: center;
		font-size: 15px;
		padding-left: 5rem;
		width: 28.5rem;
		padding: 12px 20px;
		margin: 8px 0;
		box-sizing: border-box;
		font-family: formFont;
	}

	.tabPanel {
		display: none;
	}
	.form {
		padding-bottom: 2rem;
	}
	.accountSum {
		margin: 1rem 0rem 1rem 2rem;
		text-align: left;
	}

	.accountDesc {
		margin: 1rem 2rem 1rem 2rem;
		min-width: 10rem;
		max-width: 100vw;
		text-align: left;
		display: flex;
		flex-direction: row;
		gap: 1em;
		justify-content: space-evenly;
	}
	.inputFormat {
		margin: 1rem 2rem 1rem 2rem;
		min-width: 10rem;
		max-width: 100vw;
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 1em;
		justify-content: space-evenly;
	}

	.QuickPoT {
		display: flex;
		flex-direction: column;
	}

	a {
		padding: 11px 15px;
		margin-right: 20px;
		display: inline-block;
	}
	a svg {
		display: inline-block;
		vertical-align: middle;
	}

	/* Style the buttons */
	.btn {
		font-size: 11px;
	}

	/* Style the active class, and buttons on mouse-over */
	.active {
		background-color: #597e0e;
		color: white;
	}

	.accountFormat {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.summaryHeading {
		font-size: 18px;
		align-self: center;
		margin-left: 1rem;
	}

	.QAlabels {
		padding-right: 20px;
	}

	.accountType {
		display: inline-flex;
		color: #74992e;
		font-weight: bold;
		min-width: 10rem;
	}
	.accountNum {
		color: black;
		font-weight: bold;
		min-width: 10rem;
	}
	.accountBal {
		color: black;
		font-weight: bold;
		min-width: 10rem;
		text-align: right;
	}
	.columnClass {
		flex-direction: column;
	}
`;

export const Dashboard = () => {
	var tabButtons = document.querySelectorAll(".tabs button");
	var tabPanel = document.querySelectorAll(".tabPanel");

	function showPanel(panelIndex) {
		tabPanel.forEach(function (node) {
			node.style.display = "none";
		});
		tabPanel[panelIndex].style.display = "block";
	}

	for (var i = 0; i < tabButtons.length; i++) {
		tabButtons[i].addEventListener("click", function () {
			var panelIndex = this.getAttribute("data-panel-index");
			showPanel(panelIndex);
			var current = document.querySelector(".tabs button.active");
			current.className = current.className.replace(" active", "");
			this.className += " active";
		});
	}

	return (
		<Styles>
			<script src={"myScript.js"}></script>
			<div className="container">
				<div className="QuickActions">
					<div className="QuickPoT">
						<div className="header">
							<a>
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 512 512"
									>
										<path
											fill="#74992e"
											d="M47.5 104H432V51.52a16 16 0 0 0-19.14-15.69l-368 60.48a16 16 
                                    0 0 0-12 10.47A39.69 39.69 0 0 1 47.5 104Zm416 24h-416a16 16 
                                    0 0 0-16 16v288a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V144a16 16 0 
                                    0 0-16-16ZM368 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32Z"
										/>
										<path
											fill="#74992e"
											d="M31.33 259.5V116c0-12.33 5.72-18.48 15.42-20c35.2-5.53 108.58-8.5 108.58-8.5s-8.33 16-27.33 16V128c18.5 0 31.33 23.5 31.33 23.5L84.83 
                                    236Z"
										/>
									</svg>
									<span className={{ color: "#74992e", paddingLeft: "10px" }}>
										Quick Actions
									</span>
								</span>
							</a>
						</div>
					</div>

					<div class="tabs" id="myTabs">
						<button data-panel-index="0" class="active">
							<span class="button_top btn active">Make a Payment</span>
						</button>
						<button data-panel-index="1">
							<span class="button_top btn">Make a Transfer</span>
						</button>
						<button data-panel-index="2">
							<span class="button_top btn">Make a Withdrawal</span>
						</button>
						<button data-panel-index="3">
							<span class="button_top btn">Make a Deposit</span>
						</button>
					</div>

					<div className="listOfAccounts">
						<div className="form tabPanel">
							<form>
								<div className="inputFormat">
									<label for="Account" className="QAlabels">
										<span className="red">*</span>From
									</label>
									<select id="Account" name="Account">
										<option value="" disabled selected hidden>
											Select Account...
										</option>
										<option value="Alex">Alex's Account</option>
										<option value="Teo">Teo's Account</option>
										<option value="Hadi">Hadi's Account</option>
									</select>
									<br></br>
									<label for="Account" className="QAlabels">
										<span className="red">*</span>Type
									</label>
									<select id="type" name="type">
										<option value="" disabled selected hidden>
											Select Account Type...
										</option>
										<option value="Chequing">Chequing</option>
										<option value="Savings">Savings</option>
									</select>
									<br></br>
									<label for="Payee" className="QAlabels">
										<span className="red">*</span>To
									</label>
									<select id="Payee" name="Payee">
										<option value="" disabled selected hidden>
											Select Payee...
										</option>
										<option value="Alex">Alex's Account</option>
										<option value="Teo">Teo's Account</option>
										<option value="Hadi">Hadi's Account</option>
									</select>
									<br></br>
									<label for="Amount" className="QAlabels">
										<span className="red">*</span>Amount
									</label>
									<input
										type="text"
										id="Amount"
										name="Amount"
										placeholder="$Amount"
									></input>
								</div>
								<button>
									<input
										className="Payment button_top"
										type="submit"
										value="Make Payment"
										style={{ fontSize: "15px", fontWeight: "bold" }}
									/>
								</button>
							</form>
						</div>
						<div className="form tabPanel">
							<form>
								<div className="inputFormat">
									<label for="Account" className="QAlabels">
										<span className="red">*</span>From
									</label>
									<select id="Account" name="Account">
										<option value="" disabled selected hidden>
											Select Account...
										</option>
										<option value="Alex">Alex's Account</option>
										<option value="Teo">Teo's Account</option>
										<option value="Hadi">Hadi's Account</option>
									</select>
									<br></br>
									<label for="Account" className="QAlabels">
										<span className="red">*</span>Type
									</label>
									<select id="type" name="type">
										<option value="" disabled selected hidden>
											Select Account Type...
										</option>
										<option value="Chequing">Chequing</option>
										<option value="Savings">Savings</option>
									</select>
									<br></br>
									<label for="Payee" className="QAlabels">
										<span className="red">*</span>To
									</label>
									<select id="Payee" name="Payee">
										<option value="" disabled selected hidden>
											Select Account Type...
										</option>
										<option value="Chequing">Chequing</option>
										<option value="Savings">Savings</option>
									</select>
									<br></br>
									<label for="Amount" className="QAlabels">
										<span className="red">*</span>Amount
									</label>
									<input
										type="text"
										id="Amount"
										name="Amount"
										placeholder="$ Transfer Amount"
									></input>
								</div>
								<button>
									<input
										className="Payment button_top"
										type="submit"
										value="Confirm Transfer"
										style={{ fontSize: "15px", fontWeight: "bold" }}
									></input>
								</button>
							</form>
						</div>
						<div className="tabPanel">
							<form>
								<div className="inputFormat">
									<label for="Account" className="QAlabels">
										<span className="red">*</span>From
									</label>
									<select id="Account" name="Account">
										<option value="" disabled selected hidden>
											Select Account...
										</option>
										<option value="Alex">Alex's Account</option>
										<option value="Teo">Teo's Account</option>
										<option value="Hadi">Hadi's Account</option>
									</select>
									<br></br>
									<label for="Account" className="QAlabels">
										<span className="red">*</span>Type
									</label>
									<select id="type" name="type">
										<option value="" disabled selected hidden>
											Select Account Type...
										</option>
										<option value="Chequing">Chequing</option>
										<option value="Savings">Savings</option>
									</select>
									<br></br>
									<label for="Amount" className="QAlabels">
										<span style={{ color: "red" }}>*</span>Amount
									</label>
									<input
										type="text"
										id="Amount"
										name="Amount"
										placeholder="$ Withdraw Amount"
									></input>
								</div>
								<button>
									<input
										className="Payment button_top"
										type="submit"
										value="Confirm Withdraw"
										style={{ fontSize: "15px", fontWeight: "bold" }}
									></input>
								</button>
								<br></br>
								<br></br>
								<br></br>
							</form>
						</div>
						<div className="tabPanel">
							<form>
								<div className="inputFormat">
									<label for="Account" className="QAlabels">
										<span className="red">*</span>From
									</label>
									<select id="Account" name="Account">
										<option value="" disabled selected hidden>
											Select Account...
										</option>
										<option value="Alex">Alex's Account</option>
										<option value="Teo">Teo's Account</option>
										<option value="Hadi">Hadi's Account</option>
									</select>
									<br></br>
									<label for="Payee" className="QAlabels">
										<span className="red">*</span>To
									</label>
									<select id="Payee" name="Payee">
										<option value="" disabled selected hidden>
											Select Account Type...
										</option>
										<option value="Chequing">Chequing</option>
										<option value="Savings">Savings</option>
									</select>
									<br></br>
									<label for="Amount" style={{ paddingRight: "20px" }}>
										<span className="red">*</span>Amount
									</label>
									<input
										type="text"
										id="Amount"
										name="Amount"
										placeholder="$ Deposit Amount"
									></input>
								</div>
								<button>
									<input
										className="Payment button_top"
										type="submit"
										value="Confirm Deposit"
										style={{ fontSize: "15px", fontWeight: "bold" }}
									></input>
								</button>
								<br></br>
								<br></br>
							</form>
						</div>
					</div>
				</div>
				<div className="summary">
					<div className="header">
						<a>
							<span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="25"
									height="25"
									viewBox="0 0 24 24"
								>
									<path
										fill="#74992e"
										d="M14 9.9V8.2q.825-.35 1.688-.525Q16.55 7.5 17.5 7.5q.65 0 1.275.1q.625.1 1.225.25v1.6q-.6-.225-1.212-.337Q18.175 9 17.5 9q-.95 
                                0-1.825.238Q14.8 9.475 14 9.9Zm0 5.5v-1.7q.825-.35 1.688-.525Q16.55 13 17.5 13q.65 
                                0 1.275.1q.625.1 1.225.25v1.6q-.6-.225-1.212-.337q-.613-.113-1.288-.113q-.95 0-1.825.225T14 15.4Zm0-2.75v-1.7q.825-.35 1.688-.525q.862-.175 
                                1.812-.175q.65 0 1.275.1q.625.1 1.225.25v1.6q-.6-.225-1.212-.337q-.613-.113-1.288-.113q-.95 0-1.825.238q-.875.237-1.675.662ZM6.5 16q1.175 0 
                                2.288.262q1.112.263 2.212.788V7.2q-1.025-.6-2.175-.9Q7.675 6 6.5 6q-.9 0-1.787.175Q3.825 6.35 3 6.7v9.9q.875-.3 1.738-.45Q5.6 16 6.5 16Zm6.5 1.05q1.1-.525 2.213-.788Q16.325 
                                16 17.5 16q.9 0 1.763.15q.862.15 1.737.45V6.7q-.825-.35-1.712-.525Q18.4 6 17.5 6q-1.175 0-2.325.3q-1.15.3-2.175.9ZM12 20q-1.2-.95-2.6-1.475Q8 18 6.5 18q-1.05 
                                0-2.062.275q-1.013.275-1.938.775q-.525.275-1.012-.025Q1 18.725 1 18.15V6.1q0-.275.138-.525q.137-.25.412-.375q1.15-.6 2.4-.9Q5.2 4 6.5 4q1.45 0 2.838.375Q10.725 4.75 12 5.5q1.275-.75 
                                2.663-1.125Q16.05 4 17.5 4q1.3 0 2.55.3q1.25.3 2.4.9q.275.125.413.375q.137.25.137.525v12.05q0 .575-.487.875q-.488.3-1.013.025q-.925-.5-1.938-.775Q18.55 18 17.5 18q-1.5 0-2.9.525T12 20Zm-5-8.35Z"
									/>
								</svg>
								<span style={{ color: "#f00" }}>My Account Summary</span>
							</span>
						</a>
					</div>
					<div className="desc">
						<div className="item2">Account</div>
						<div className="item3">Totals </div>
					</div>
					<div className="listOfAccounts">
						<div className="header">
							<span className="summaryHeading">Debit Accounts</span>
						</div>
						<div className="accountSum">
							<div>
								<p>Alex's Account</p>
								<div className="accountDesc">
									<div style={{ flexDirection: "column" }}>
										<p className="accountType">Chequing</p>
										<p className="accountNum  hover-underline-animation">
											XXXX-XXXX-XXX
										</p>
									</div>
									<p className="accountBal">$100000.01 CAD</p>
								</div>
								<div className="accountDesc">
									<div style={{ flexDirection: "column" }}>
										<p className="accountType">Savings</p>
										<p className="accountNum  hover-underline-animation">
											XXXX-XXXX-XXX
										</p>
									</div>
									<p className="accountBal">$100000.01 CAD</p>
								</div>
							</div>
							<div>
								<p>Teo's Account</p>
								<div className="accountDesc">
									<div style={{ flexDirection: "column" }}>
										<p className="accountType">Chequing</p>
										<p className="accountNum  hover-underline-animation">
											XXXX-XXXX-XXX
										</p>
									</div>
									<p className="accountBal">$100000.01 CAD</p>
								</div>
								<div className="accountDesc">
									<div style={{ flexDirection: "column" }}>
										<p className="accountType">Savings</p>
										<p className="accountNum  hover-underline-animation">
											XXXX-XXXX-XXX
										</p>
									</div>
									<p className="accountBal">$100000.01 CAD</p>
								</div>
								<p>Hadi's Account</p>
								<div className="accountDesc">
									<div style={{ flexDirection: "column" }}>
										<p className="accountType">Chequing</p>
										<p className="accountNum  hover-underline-animation">
											XXXX-XXXX-XXX
										</p>
									</div>
									<p className="accountBal">$100000.01 CAD</p>
								</div>
								<div className="accountDesc">
									<div style={{ flexDirection: "column" }}>
										<p className="accountType">Savings</p>
										<p className="accountNum  hover-underline-animation">
											XXXX-XXXX-XXX
										</p>
									</div>
									<p className="accountBal">$100000.01 CAD</p>
								</div>
							</div>
						</div>
					</div>
					<div className="creditDisc">
						<div>Outgoing Balance</div>
					</div>
					<div className="listOfAccounts">
						<div className="header">
							<span className="summaryHeading">Credit Accounts</span>
						</div>
						<div className="accountSum">
							<div>
								<p>Alex's Credit Card</p>
								<div className="accountDesc">
									<div style={{ flexDirection: "column" }}>
										<p className="accountType">Creddit Card</p>
										<p className="accountNum  hover-underline-animation">
											XXXX-XXXX-XXXX
										</p>
									</div>
									<p className="accountBal">$999.99 CAD</p>
								</div>
								<div>
									<p>Hadi's Credit Card</p>
									<div className="accountDesc">
										<div style={{ flexDirection: "column" }}>
											<p className="accountType">Creddit Card</p>
											<p className="accountNum  hover-underline-animation">
												XXXX-XXXX-XXXX
											</p>
										</div>
										<p className="accountBal">$999.99 CAD</p>
									</div>
								</div>
							</div>
						</div>
						<div className="divider"></div>
					</div>
				</div>
			</div>
		</Styles>
	);
};
