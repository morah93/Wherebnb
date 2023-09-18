import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SignupForm from "../SignupFormModal/SignupForm";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import AddSpot from "../addSpot/addSpot";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const [showModal, setShowModal] = useState(false);
	const [createSpotModal, setCreateSpotModal] = useState(false);
	const [login, setLogin] = useState(true);
	// console.log('this is showModal', showModal)
	// console.log('this is login', login)
	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	}
	// else {
	//   sessionLinks = (
	//     <>
	//       <LoginFormModal />
	//     </>
	//   );
	// }

	return (
		<>
			<div className='navigationContainer'>
				<div className='navigation'>
					<div className='homeLogo'>
						<NavLink
							exact
							to='/'
						>
							<img
								className='logoImg'
								src='https://i.imgur.com/zE4UHjw.png'
							/>
						</NavLink>
					</div>
					<div>
						{isLoaded && (
							<ProfileButton
								user={sessionUser}
								setLogin={setLogin}
								setShowModal={setShowModal}
								setCreateSpotModal={setCreateSpotModal}
							/>
						)}
					</div>
				</div>
				{showModal && (
					<Modal onClose={() => setShowModal(false)}>
						{login ? (
							<LoginForm setShowModal={setShowModal} />
						) : (
							<SignupForm setShowModal={setShowModal} />
						)}
					</Modal>
				)}
				{createSpotModal && (
					<Modal onClose={() => setCreateSpotModal(false)}>
						{sessionUser && <AddSpot setCreateSpotModal={setCreateSpotModal} />}
					</Modal>
				)}
				{/* <div className='tags'>
					<div className='pool'>
						<img
							src='https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg'
							alt=''
							width='24'
							height='24'
						/>
						<p id="pool">Amazing Pool</p>
					</div>
					<div className='rooms'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="pool">Rooms</p>
					</div>
					<div className='cabins'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="cabins">Cabins</p>
					</div>
					<div className='lakefront'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="lakefront">Lakefront</p>
					</div>
					<div className='boats'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="boats">Boats</p>
					</div>
					<div className='mansions'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="mansions">Mansions</p>
					</div>
					<div className='beachfront'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="beachfront">Beachfront</p>
					</div>
					<div className='amazingViews'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="amazingViews">Amazing views</p>
					</div>
					<div className='omg'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="omg">OMG!</p>
					</div>
					<div className='tinyHomes'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="tinyHomes">Tiny homes</p>
					</div>
					<div className='trending'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="trending">Trending</p>
					</div>
					<div className='countryside'>
						<img
							class='i181yxiv dir dir-ltr'
							src='https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg'
							alt=''
							width='24'
							height='24'
						/>{" "}
						<p id="countryside">Countryside</p>
					</div>
				</div> */}
			</div>
		</>
	);
}

export default Navigation;
