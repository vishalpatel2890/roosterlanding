import React, { Component } from "react";
import firebase from "firebase";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Carousel from "antd/lib/carousel";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Responsive from "react-responsive";

import "./App.css";

const Default = ({ children }) => (
	<Responsive minWidth={500} children={children} />
);
const Mobile = ({ children }) => (
	<Responsive maxWidth={500} children={children} />
);

class App extends Component {
	state = { textFieldValue: "" };
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
	}

	onSubmit(e) {
		e.preventDefault();
		const email = this.state.textFieldValue;
		console.log(email);
		firebase
			.database()
			.ref("/landingpage")
			.push({ email })
			.then(() => {
				console.log("done");
			});
	}

	handleTextFieldChange = e => {
		this.setState({
			textFieldValue: e.target.value
		});
	};

	render() {
		return (
			<div>
				<Default>
					<div>
						<Row gutter={0}>
							<Col style={{ textAlign: "center" }} span={6}>
								<img src={require("./logo.png")} width="90%" height="90%" />
								<p>Phone To Table</p>
							</Col>
							<Col span={12} style={{ textAlign: "center" }}>
								<Carousel autoplay effect="fade">
									<div>Get connected with your favorite local producers</div>
									<div>Discover whats happening in your local food scence</div>
									<div>Be the first to get the freshest and bestest foods</div>
								</Carousel>
								<br />
								<br />
								<form>
									<TextField
										hintText="Email"
										style={{ fontSize: 30, width: "80%" }}
										underlineStyle={{ borderColor: "#B90C5C" }}
										underlineFocusStyle={{ borderColor: "#000000" }}
										value={this.state.textFieldValue}
										onChange={this.handleTextFieldChange}
									/>
									<RaisedButton
										type="submit"
										label="Sign Up"
										onClick={e => this.onSubmit(e)}
									/>
								</form>
								<br />
								<br />
								<br />
								<p>Have a question?</p>
								<a href="mailto:vishalpatel2890@gmail.com">
									<RaisedButton label="Talk To Us" />
								</a>
							</Col>
							<Col span={6}>
								<Carousel autoplay effect="fade">
									<div>
										<img
											src={require("./assets/iphone-rooster.png")}
											width="100%"
											height="100%"
										/>
									</div>
									<div>
										<img
											src={require("./assets/iphone-rooster.png")}
											width="100%"
											height="100%"
										/>
									</div>
								</Carousel>
							</Col>
						</Row>
						<div className="rooster-footer">
							<p>so you dont have to be up at the crack of dawn</p>
						</div>
					</div>
				</Default>
				<Mobile>
					<Row gutter={0} style={{ textAlign: "center" }}>
						<img src={require("./logo.png")} width="20%" height="20%" />
						<p>Phone To Table</p>
					</Row>
					<Row gutter={0} style={{ textAlign: "center" }}>
						<Carousel autoplay effect="fade">
							<div>Get connected with your favorite local producers</div>
							<div>Discover whats happening in your local food scence</div>
							<div>Be the first to get the freshest and bestest foods</div>
						</Carousel>
					</Row>
					<Row gutter={0} style={{ textAlign: "center" }}>
						<TextField
							hintText="Email"
							style={{ fontSize: 30, width: "80%" }}
							underlineStyle={{ borderColor: "#B90C5C" }}
							underlineFocusStyle={{ borderColor: "#000000" }}
						/>
						<br />
						<br />
						<p>Have a question?</p>
						<a href="mailto:vishalpatel2890@gmail.com">
							<RaisedButton label="Talk To Us" />
						</a>
					</Row>
					<Row gutter={0} style={{ textAlign: "center" }}>
						<img
							src={require("./assets/iphone-rooster.png")}
							width="58%"
							height="58%"
						/>
					</Row>
				</Mobile>
			</div>
		);
	}
}

export default App;
