import React, { Component } from "react";
import firebase from "firebase";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Carousel from "antd/lib/carousel";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Responsive from "react-responsive";
import { Parallax, Background } from "react-parallax";
import scrollToComponent from "react-scroll-to-component";
import { ValidatorForm } from "react-form-validator-core";
import { TextValidator } from "react-material-ui-form-validator";

import "./App.css";

const Default = ({ children }) => (
	<Responsive minWidth={500} children={children} />
);
const Mobile = ({ children }) => (
	<Responsive maxWidth={500} children={children} />
);

const textFieldFirstNameValue = "textFieldFirstNameValue";
const textFieldLastNameValue = "textFieldLastNameValue";
const textFieldEmailValue = "textFieldEmailValue";
const textFieldPhoneValue = "textFieldPhoneValue";

class App extends Component {
	state = {
		textFieldFirstNameValue: "",
		textFieldLastNameValue: "",
		textFieldEmailValue: "",
		textFieldPhoneValue: "",
		SCREEN_HEIGHT: "",
		SCREEN_WIDTH: ""
	};
	componentWillMount() {
		const config = {
			apiKey: "AIzaSyDkx4ThtwQUKkOWWx0lQeAwR3gGnyCVdu4",
			authDomain: "rooster-801ef.firebaseapp.com",
			databaseURL: "https://rooster-801ef.firebaseio.com",
			projectId: "rooster-801ef",
			storageBucket: "rooster-801ef.appspot.com",
			messagingSenderId: "535291799070"
		};
		firebase.initializeApp(config);
		this.updateDimensions();
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	updateDimensions = () => {
		this.setState({
			SCREEN_HEIGHT: document.documentElement.clientHeight,
			SCREEN_WIDTH: document.documentElement.clientWidth
		});
	};

	onSubmit = state => {
		const firstName = this.state.textFieldFirstNameValue;
		const lastName = this.state.textFieldLastNameValue;
		const email = this.state.textFieldEmailValue;
		const phone = this.state.textFieldPhoneValue;
		firebase
			.database()
			.ref("/landingpage")
			.push({ firstName, lastName, email, phone })
			.then(() => {
				console.log("done");
				this.setState({
					textFieldFirstNameValue: "",
					textFieldLastNameValue: "",
					textFieldEmailValue: "",
					textFieldPhoneValue: ""
				});
				alert("WooHoo You Did It!");
			});
	};

	handleTextFieldChange = (e, field) => {
		this.setState({
			[field]: e.target.value
		});
	};

	render() {
		const { SCREEN_HEIGHT, SCREEN_WIDTH } = this.state;
		const imgSize = (SCREEN_HEIGHT / 760 * 100).toFixed(2);
		const homeimgSize = (0.225 * (SCREEN_HEIGHT / 722 * 100)).toFixed(2);

		return (
			<div>
				<Default>
					<Parallax strength={this.state.SCREEN_HEIGHT}>
						<Background>
							<img
								src={require("./assets/roosterbg.png")}
								style={{
									width: this.state.SCREEN_WIDTH,
									height: SCREEN_HEIGHT
								}}
							/>
						</Background>
						<br />
						<div className="element">
							<Row style={{ textAlign: "center" }}>
								<Col>
									<img src={require("./assets/homephone.png")} />
								</Col>
								<Col>
									<div
										onClick={() =>
											scrollToComponent(this.Main, {
												offset: 0,
												align: "top",
												duration: 1000
											})}
									>
										<img src={require("./assets/shape.svg")} />
									</div>
								</Col>
							</Row>
						</div>
						<Row>
							<section
								ref={section => {
									this.Main = section;
								}}
								className="bottom-element"
							>
								<div className="left-slant" />
								<div className="left-column">
									<h1>
										<span className="header-text">Farmers markets </span>
									</h1>
									<h1>
										<span className="header-text">in your pocket </span>
									</h1>
									<div className="wrap">
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Sed ultricies ex urna, vel porttitor arcu commodo id.
											Suspendisse eget felis congue, aliquet velit ut, lacinia
											risus. Quisque ac nisl at nunc fringilla hendrerit quis
											sed justo. Curabitur urna eros, iaculis in lacinia quis,
											ultricies at nunc. Sed ac malesuada eros. Suspendisse at
											metus malesuada, varius lectus ac, semper massa.
										</p>
									</div>
								</div>

								<div className="phone">
									<img
										src={require("./assets/phone.png")}
										style={{ width: imgSize + "%", height: imgSize + "%" }}
									/>
								</div>
								<div className="hand">
									<img
										src={require("./assets/hand.png")}
										style={{ width: imgSize + "%", height: imgSize + "%" }}
									/>
								</div>
								<div className="sign-up">
									<ValidatorForm
										ref="form"
										onSubmit={this.onSubmit}
										onError={errors => console.log(errors)}
										style={{ width: "80%" }}
									>
										<Row>
											<h1>Contact</h1>
											<br />
										</Row>
										<Row>
											<TextField
												hintText="First Name"
												style={{
													fontSize: 30,
													width: "48.5%",
													padding: "10px 12px",
													border: "1px solid #ced4da",
													background: "#ffffff",
													marginRight: 5,
													marginBottom: 5
												}}
												underlineStyle={{ border: "none" }}
												underlineFocusStyle={{ borderColor: "none" }}
												value={this.state.textFieldFirstNameValue}
												onChange={e =>
													this.handleTextFieldChange(
														e,
														textFieldFirstNameValue
													)}
											/>
											<TextField
												hintText="Last Name"
												style={{
													fontSize: 30,
													width: "48.5%",
													padding: "10px 12px",
													border: "1px solid #ced4da",
													background: "#ffffff",
													marginBottom: 5,
													marginLeft: 5
												}}
												underlineStyle={{ border: "none" }}
												underlineFocusStyle={{ borderColor: "none" }}
												value={this.state.textFieldLastNameValue}
												onChange={e =>
													this.handleTextFieldChange(e, textFieldLastNameValue)}
											/>
											<TextValidator
												hintText="Email"
												name="email"
												style={{
													fontSize: 30,
													width: "100%",
													padding: "10px 12px",
													border: "1px solid #ced4da",
													background: "#ffffff",
													marginTop: 5,
													marginBottom: 5
												}}
												underlineStyle={{ border: "none" }}
												underlineFocusStyle={{ borderColor: "none" }}
												value={this.state.textFieldEmailValue}
												validators={["required", "isEmail"]}
												errorMessages={[
													"this field is required",
													"email is not valid"
												]}
												onChange={e =>
													this.handleTextFieldChange(e, textFieldEmailValue)}
											/>
											<TextValidator
												hintText="Phone Number"
												name="phone"
												style={{
													fontSize: 30,
													width: "100%",
													padding: "10px 12px",
													border: "1px solid #ced4da",
													background: "#ffffff",
													marginTop: 5
												}}
												underlineStyle={{ border: "none" }}
												underlineFocusStyle={{ borderColor: "none" }}
												value={this.state.textFieldPhoneValue}
												onChange={e =>
													this.handleTextFieldChange(e, textFieldPhoneValue)}
												validators={["isPhone"]}
												errorMessages={["phone is not valid"]}
											/>
										</Row>
										<Row>
											<RaisedButton
												type="submit"
												label="Submit"
												labelColor="#ffffff"
												style={{ float: "right", marginTop: 10 }}
												backgroundColor="#cc055f"
												buttonStyle={{ height: 50, width: 150 }}
												labelStyle={{ fontSize: 24 }}
											/>
										</Row>
									</ValidatorForm>
								</div>
							</section>
						</Row>
					</Parallax>
				</Default>
				<Mobile>
					<Parallax strength={SCREEN_HEIGHT}>
						<Background>
							<img
								src={require("./assets/roosterbg.png")}
								style={{
									width: this.state.SCREEN_WIDTH,
									height: SCREEN_HEIGHT
								}}
							/>
						</Background>
						<div>
							<div className="element">
								<Row style={{ textAlign: "center" }}>
									<Col>
										<img src={require("./assets/homephone.png")} />
									</Col>
									<Col>
										<div
											onClick={() =>
												scrollToComponent(this.Main, {
													offset: 0,
													align: "top",
													duration: 1000
												})}
										>
											<img src={require("./assets/shape.svg")} />
										</div>
									</Col>
								</Row>
							</div>
							<Row>
								<section
									ref={section => {
										this.Main = section;
									}}
									className="bottom-element"
								>
									<div className="left-slant-mobile" />
									<div className="left-column-mobile">
										<h1>
											<span className="header-text-mobile">
												Farmers markets{" "}
											</span>
										</h1>
										<h1>
											<span className="header-text-mobile">
												in your pocket{" "}
											</span>
										</h1>
										<div className="wrap">
											<p style={{ fontSize: 10 }}>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Sed ultricies ex urna, vel porttitor arcu commodo id.
												Suspendisse eget felis congue, aliquet velit ut, lacinia
												risus. Quisque ac nisl at nunc fringilla hendrerit quis
												sed justo. Curabitur urna eros, iaculis in lacinia quis,
												ultricies at nunc. Sed ac malesuada eros. Suspendisse at
												metus malesuada, varius lectus ac, semper massa.
											</p>
										</div>
									</div>
									<div className="sign-up-mobile">
										<ValidatorForm
											ref="form"
											onSubmit={this.onSubmit}
											onError={errors => console.log(errors)}
											style={{ width: "100%" }}
										>
											<Row>
												<h1>Contact</h1>
												<br />
											</Row>
											<Row>
												<TextField
													hintText="First Name"
													style={{
														fontSize: 14,
														width: "100%",
														padding: "10px 12px",
														border: "1px solid #ced4da",
														background: "#ffffff",
														margin: 5
													}}
													underlineStyle={{ border: "none" }}
													underlineFocusStyle={{ borderColor: "none" }}
													value={this.state.textFieldFirstNameValue}
													onChange={e =>
														this.handleTextFieldChange(
															e,
															textFieldFirstNameValue
														)}
												/>
												<TextField
													hintText="Last Name"
													style={{
														fontSize: 14,
														width: "100%",
														padding: "10px 12px",
														border: "1px solid #ced4da",
														background: "#ffffff",
														margin: 5
													}}
													underlineStyle={{ border: "none" }}
													underlineFocusStyle={{ borderColor: "none" }}
													value={this.state.textFieldLastNameValue}
													onChange={e =>
														this.handleTextFieldChange(
															e,
															textFieldLastNameValue
														)}
												/>
												<TextValidator
													hintText="Email"
													name="email"
													style={{
														fontSize: 14,
														width: "100%",
														padding: "10px 12px",
														border: "1px solid #ced4da",
														background: "#ffffff",
														margin: 5
													}}
													underlineStyle={{ border: "none" }}
													underlineFocusStyle={{ borderColor: "none" }}
													value={this.state.textFieldEmailValue}
													validators={["required", "isEmail"]}
													errorMessages={[
														"this field is required",
														"email is not valid"
													]}
													onChange={e =>
														this.handleTextFieldChange(e, textFieldEmailValue)}
												/>
												<TextValidator
													hintText="Phone Number"
													name="phone"
													style={{
														fontSize: 14,
														width: "100%",
														padding: "10px 12px",
														border: "1px solid #ced4da",
														background: "#ffffff",
														margin: 5
													}}
													underlineStyle={{ border: "none" }}
													underlineFocusStyle={{ borderColor: "none" }}
													value={this.state.textFieldPhoneValue}
													onChange={e =>
														this.handleTextFieldChange(e, textFieldPhoneValue)}
													validators={["isPhone"]}
													errorMessages={["phone is not valid"]}
												/>
											</Row>
											<Row>
												<RaisedButton
													type="submit"
													label="Submit"
													labelColor="#ffffff"
													style={{ float: "right", marginTop: 10 }}
													backgroundColor="#cc055f"
													buttonStyle={{ height: 50, width: 150 }}
													labelStyle={{ fontSize: 24 }}
												/>
											</Row>
										</ValidatorForm>
									</div>
								</section>
							</Row>
						</div>
					</Parallax>
				</Mobile>
			</div>
		);
	}
}

ValidatorForm.addValidationRule("isPhone", value => {
	if (value.length === 0) {
		return true;
	} else {
		var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
		return re.test(value);
	}
});

export default App;
