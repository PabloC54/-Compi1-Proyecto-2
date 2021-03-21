import React, { useRef } from "react";
import "./Button.css";

const Button = (props) => {
	const { text, type } = props;
	const inputFile = useRef(null);

	switch (type) {
		case "Abrir":
			var content;

			const onButtonClick = () => {
				inputFile.current.click();
			};

			const handleFileUpload = (e) => {
				const { files } = e.target;
				if (files && files.length) {
					const filename = files[0].name;

					var parts = filename.split(".");
					const fileType = parts[parts.length - 1];
					console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

					content = files[0];
				}
			};

			return (
				<div>
					<input
						style={{ display: "none" }}
						accept=".ty"
						ref={inputFile}
						onChange={handleFileUpload}
						type="file"
					/>
					<button class="btn" onClick={onButtonClick}>
						{text}
					</button>
					<p>{content}</p>
				</div>
			);
		default:
			break;
	}

	return <p>pos nada</p>;
};

export default Button;
