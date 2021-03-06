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
import { Experiment, Variant, emitter } from "react-ab-test";
import ReactGA from "react-ga";

import "./App.css";

const HiRes = ({ children }) => (
	<Responsive minWidth={1900} children={children} />
);
const Default = ({ children }) => (
	<Responsive minWidth={750} maxWidth={1900} children={children} />
);
const Mobile = ({ children }) => (
	<Responsive maxWidth={750} children={children} />
);

const textFieldFirstNameValue = "textFieldFirstNameValue";
const textFieldLastNameValue = "textFieldLastNameValue";
const textFieldEmailValue = "textFieldEmailValue";
const textFieldPhoneValue = "textFieldPhoneValue";

ReactGA.initialize("UA-67701564-2");
emitter.defineVariants("myExperiment", ["control", "variant"], [50, 50]);


class App extends Component {
	state = {
		textFieldFirstNameValue: "",
		textFieldLastNameValue: "",
		textFieldEmailValue: "",
		textFieldPhoneValue: "",
		SCREEN_HEIGHT: "",
		SCREEN_WIDTH: "",
		SCREEN_WIDTH1: "",
		variantKey: ""
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
		// emitter.addPlayListener((experimentName, variantName) => {
		// 	// what to do when experiment is displayed. E.g. log to Mixpanel or save to database (with redux-saga for instance)
		// });
		emitter.addWinListener((experimentName, variantName) => {
			ReactGA.event({
				category: "Landing Page",
				action: "Form Submit",
				label: variantName
			});
		});
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	updateDimensions = () => {
		this.setState({
			SCREEN_HEIGHT: document.documentElement.clientHeight,
			SCREEN_WIDTH: window.innerWidth,
			SCREEN_WIDTH1: document.documentElement.clientWidth
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
				emitter.emitWin("myExperiment");
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
		const { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH1 } = this.state;
		const imgSize = (SCREEN_HEIGHT / 760 * 100).toFixed(2);
		const homeimgSize = (0.225 * (SCREEN_WIDTH / 1600 * 100)).toFixed(2);
		const hiresSize = imgSize / 2;
		return (
			<div>
				<Experiment name="myExperiment">
					<Variant name="variant">
						<HiRes>
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
											<img src={require("./assets/homephone@2x.png")} />
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
										<h1 style={{ lineHeight: 1.25 }}>
											<span className="header-text">
												An app to bring the
											</span>
										</h1>
										<h1 style={{ lineHeight: 1.25}}>
											<span className="header-text">farmers market from</span>
										</h1>
										<h1 style={{ lineHeight: 1.25}}>
											<span className="header-text-red">phone to table</span>
										</h1>

											<div className="wrap">
											<ul className="list-main">
											<li>Discover the best local producers of meat, seafood, produce, wine, cheese and more
												</li>
												<li>Choose a pick up time and location that works around your schedule
												</li>
												<li>Preorder to avoid the rush and guarantee your favorite things are waiting for you</li>
												<li>Connect to the awesome people who make your awesome food
												</li>
											</ul>
											</div>
										</div>

										<div className="phone">
											<img
												src={require("./assets/phone@2x.png")}
												style={{
													width: hiresSize + "%",
													height: hiresSize + "%"
												}}
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
															this.handleTextFieldChange(
																e,
																textFieldLastNameValue
															)}
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
															this.handleTextFieldChange(
																e,
																textFieldEmailValue
															)}
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
															this.handleTextFieldChange(
																e,
																textFieldPhoneValue
															)}
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
						</HiRes>
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
											<img
												src={require("./assets/homephone.png")}
											/>
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
										<h1 style={{ lineHeight: 1.25 }}>
											<span className="header-text">
												An app to bring the
											</span>
										</h1>
										<h1 style={{ lineHeight: 1.25}}>
											<span className="header-text">farmers market from</span>
										</h1>
										<h1 style={{ lineHeight: 1.25}}>
											<span className="header-text-red">phone to table</span>
										</h1>
											<div className="wrap">
											<ul className="list-main">
											<li>Discover the best local producers of meat, seafood, produce, wine, cheese and more
												</li>
												<li>Choose a pick up time and location that works around your schedule
												</li>
												<li>Preorder to avoid the rush and guarantee your favorite things are waiting for you</li>
												<li>Connect to the awesome people who make your awesome food
												</li>
											</ul>
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
															fontSize: 20,
															width: "48%",
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
															fontSize: 20,
															width: "48%",
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
															this.handleTextFieldChange(
																e,
																textFieldLastNameValue
															)}
													/>
													<TextValidator
														hintText="Email"
														name="email"
														style={{
															fontSize: 20,
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
															this.handleTextFieldChange(
																e,
																textFieldEmailValue
															)}
													/>
													<TextValidator
														hintText="Phone Number"
														name="phone"
														style={{
															fontSize: 20,
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
															this.handleTextFieldChange(
																e,
																textFieldPhoneValue
															)}
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
												<img
													src={require("./assets/homephone.png")}
													style={{
														width: "50%",
														height: "50%"
													}}
												/>
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
											<h1 style={{ lineHeight: 1.25 }}>
												<span className="header-text">
													An app to bring the
												</span>
											</h1>
											<h1 style={{ lineHeight: 1.25}}>
												<span className="header-text">farmers market from</span>
											</h1>
											<h1 style={{ lineHeight: 1.25}}>
												<span className="header-text-red">phone to table</span>
											</h1>
												<div className="wrap-mobile">
												<ul className="list-main-mobile">
												<li>Discover the best local producers of meat, seafood, produce, wine, cheese and more
													</li>
													<li>Choose a pick up time and location that works around your schedule
													</li>
													<li>Preorder to avoid the rush and guarantee your favorite things are waiting for you</li>
													<li>Connect to the awesome people who make your awesome food
													</li>
												</ul>
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
																this.handleTextFieldChange(
																	e,
																	textFieldEmailValue
																)}
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
																this.handleTextFieldChange(
																	e,
																	textFieldPhoneValue
																)}
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
					</Variant>
					<Variant name="control">
						<HiRes>
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
											<img src={require("./assets/homephone@2x.png")} />
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
										<h1 style={{ lineHeight: 1.25 }}>
											<span className="header-text">
												Your key to the best
											</span>
										</h1>
										<h1 style={{ lineHeight: 1.25}}>
											<span className="header-text">farmers market experience</span>
										</h1>
											<div className="wrap">
											<ul className="list-main">
											<li>Discover the best local producers of meat, seafood, produce, wine, cheese and more
												</li>
												<li>Choose a pick up time and location that works around your schedule
												</li>
												<li>Preorder to avoid the rush and guarantee your favorite things are waiting for you</li>
												<li>Connect to the awesome people who make your awesome food
												</li>
																							</ul>
											</div>
										</div>
										<div className="phone">
											<img
												src={require("./assets/phone@2x.png")}
												style={{
													width: hiresSize + "%",
													height: hiresSize + "%"
												}}
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
															this.handleTextFieldChange(
																e,
																textFieldLastNameValue
															)}
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
															this.handleTextFieldChange(
																e,
																textFieldEmailValue
															)}
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
															this.handleTextFieldChange(
																e,
																textFieldPhoneValue
															)}
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
						</HiRes>
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
											<img
												src={require("./assets/homephone.png")}

											/>
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
										<h1 style={{ lineHeight: 1.25 }}>
											<span className="header-text">
												Your key to the best
											</span>
										</h1>
										<h1 style={{ lineHeight: 1.25}}>
											<span className="header-text">farmers market experience</span>
										</h1>
											<div className="wrap">
												<ul className="list-main">
												<li>Discover the best local producers of meat, seafood, produce, wine, cheese and more
													</li>
													<li>Choose a pick up time and location that works around your schedule
													</li>
													<li>Preorder to avoid the rush and guarantee your favorite things are waiting for you</li>
													<li>Connect to the awesome people who make your awesome food
													</li>
												</ul>
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
															fontSize: 20,
															width: "48%",
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
															fontSize: 20,
															width: "48%",
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
															this.handleTextFieldChange(
																e,
																textFieldLastNameValue
															)}
													/>
													<TextValidator
														hintText="Email"
														name="email"
														style={{
															fontSize: 20,
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
															this.handleTextFieldChange(
																e,
																textFieldEmailValue
															)}
													/>
													<TextValidator
														hintText="Phone Number"
														name="phone"
														style={{
															fontSize: 20,
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
															this.handleTextFieldChange(
																e,
																textFieldPhoneValue
															)}
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
												<img
													src={require("./assets/homephone.png")}
													style={{
														width: "50%",
														height: "50%"
													}}
												/>
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
											<h1 style={{ lineHeight: 1.25 }}>
												<span className="header-text">
													Your key to the best
												</span>
											</h1>
											<h1 style={{ lineHeight: 1.25}}>
												<span className="header-text">farmers market</span>
											</h1>
											<h1 style={{ lineHeight: 1.25}}>
												<span className="header-text">experience</span>
											</h1>
												<div className="wrap">
												<ul className="list-main-mobile">
											<li>Discover the best local producers of meat, seafood, produce, wine, cheese and more
											</li>
											<li>Choose a pick up time and location that works around your schedule
											</li>
											<li>Preorder to avoid the rush and guarantee your favorite things are waiting for you</li>
											<li>Connect to the awesome people who make your awesome food
											</li>
												</ul>
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
																this.handleTextFieldChange(
																	e,
																	textFieldEmailValue
																)}
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
																this.handleTextFieldChange(
																	e,
																	textFieldPhoneValue
																)}
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
					</Variant>
				</Experiment>
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
