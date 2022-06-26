import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.jpg';
import Footer from "./footer";

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user == null) {
      
	  console.log("ok",user,user?.toString.length === 0);
    }
	else {
		console.log("ok2",user.toString.length == 0);
		if(user?.accessToken != null){
			navigate('/data');
		}
	}
  }, [user]);

  return (
    <div>
      <div>
                <div className="text-center">
                    <img className="my-3" src={logo} width="500" alt="Logo"/>
                </div>

                <h1 className="text-center">EnergyLive 2022</h1>
                 <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
					<GoogleButton onClick={handleGoogleSignIn} />
				 </div>


                <Footer welcome={true}/>
            </div>
     
    </div>
  );
};

export default Signin;

