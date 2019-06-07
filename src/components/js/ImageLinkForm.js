import React from 'react';
import "../css/ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onButtonClick}) => {
	return ( 
		<div>
			<p className ='f3 smaller'>The <b>MagicBrain</b> will detect faces in your pictures. Give it a try!</p>
			<div className='centered smaller'>
				<div className='pa4 br3 custom-shadow-w form centered smaller'>
					<input 
						className ='f4 pa2 w-70 centered ba' 
						type='text'
						placeholder='enter the image url here'
						onChange = {onInputChange}
					/> 
					<button className ='w-30 f4 link ph3 pv2 dib light bg-light-purple'
							onClick ={onButtonClick} >Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;