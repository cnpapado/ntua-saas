import React, {Component} from 'react';
import { useEffect, useState } from "react";
import { UserAuth } from '../context/AuthContext';


export default function Plan() {
    const [showBanner, setShowBanner] = useState(false);
	const { user, logOut } = UserAuth();
	
	
	return (
	setShowBanner &&
		<div>
			<h1 className="mt-5 mb-3 d-flex justify-content-center">EnergyLive 2022</h1>
			<div className="container">
				<form>
					<div className="row my-3">
						<label htmlFor="first_name" className="col-2 col-form-label text-end">First Name:</label>
						<div className="col-10">
							<input type="text" className="form-control" id="first_name" defaultValue={user?.firstName}/>
						</div>
					</div>
					<div className="row my-3">
						<label htmlFor="last_name" className="col-2 col-form-label text-end">Last Name:</label>
						<div className="col-10">
							<input type="text" className="form-control" id="first_name" defaultValue={user?.lastName}/>
						</div>
					</div>
					<div className="row my-3">
						<label htmlFor="email" className="col-2 col-form-label text-end">Email:</label>
						<div className="col-10">
							<input type="email" className="form-control" id="email" defaultValue={user?.email}/>
						</div>
					</div>
					<div className="row my-3">
						<label htmlFor="last_login" className="col-2 col-form-label text-end">Last Login:</label>
						<div className="col-10">
							<input placeholder="dd-mm-yyyy" className="form-control" id="last_login" defaultValue={user?.lastLoginDate} disabled/>
						</div>
					</div>

					<div className="my-3 d-flex justify-content-center">
						<div className="card mt-3">
							<div className="card-body">
								<div className="mx-5">
									<div className="row">
										<label htmlFor="days_left" className="col-4 col-form-label text-end">Days left:</label>
										<div className="col-2">
											<input type="number" className="form-control" id="days_left" defaultValue={isNaN(window.localStorage.getItem('daysLeft'))?0:window.localStorage.getItem('daysLeft')} disabled/>
										</div>

										<label htmlFor="extend_by" className="col-4 col-form-label text-end">Extend by (days):</label>
										<div className="col-2">
											<input type="number" min="1" className="form-control" id="extend_by" defaultValue="56"/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="d-grid gap-5 d-flex justify-content-center">
						<button type="submit" className="btn btn-primary" onClick={()=>{window.localStorage.setItem('daysLeft', parseInt(document.getElementById("extend_by").value)+parseInt(isNaN(window.localStorage.getItem('daysLeft'))?0:window.localStorage.getItem('daysLeft')))}}>Extend</button>
						<button type="reset" className="btn btn-primary" onClick={() => console.log("Cancel clicked")}>Cancel</button>
					</div>
				</form>

				<div className="my-5 d-flex justify-content-center">
					<a href="/data" className="">Back</a>
				</div>
			</div>
		</div>
	);

}

