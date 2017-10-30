import React, { Component } from "react";
import firebase from "firebase";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Button from "antd/lib/button";
import Carousel from "antd/lib/carousel";

import "./App.css";

class App extends Component {
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
	state = {
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	render() {
		const actions = [
			<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onClick={this.handleClose}
			/>
		];

		return (
			<div className="App">
				<div className="container">
					<div className="outer-left">
						<img src={require("./logo.png")} />
						<p>Phone To Table</p>
					</div>
					<div className="center-column">
						<Carousel autoplay effect="fade">
							<div>Get connected with your favorite local producers</div>
							<div>Discover whats happening in local food scence</div>
							<div>Be the first to get the freshest and bestest foods</div>
						</Carousel>
						<br />
						<br />
						<TextField
							hintText="Email"
							style={{ fontSize: 30, width: 500 }}
							underlineStyle={{ borderColor: "#B90C5C" }}
							underlineFocusStyle={{ borderColor: "#000000" }}
						/>
						<br />
						<br />
						<br />
						<p>Have a question?</p>
						<RaisedButton label="Talk To Us" onClick={this.handleOpen} />
						<Dialog
							title="Dialog With Actions"
							actions={actions}
							modal={false}
							open={this.state.open}
							onRequestClose={this.handleClose}
						>
							The actions in this window were passed in as an array of React
							objects.
						</Dialog>
					</div>
					<div className="outer-right">
						<Carousel autoplay effect="fade">
							<div>
								<img
									src={require("./assets/iphone-rooster.png")}
									width="110%"
									height="110%"
								/>
							</div>
							<div>
								<img
									src={require("./assets/iphone-rooster.png")}
									width="110%"
									height="110%"
								/>
							</div>
						</Carousel>
					</div>
				</div>
				<div className="rooster-footer">
					<p>so you don't have to be up at the crack of dawn</p>
				</div>
			</div>
		);
	}
}

export default App;
