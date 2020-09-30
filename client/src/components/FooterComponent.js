import React from 'react';

function Footer()
{
    return(
        <div className="footer">
        <div className="container">
        <div className="row justify-content-center">
        
                        
               
                <div className=" offset-2 col-10 offset-sm-1 col-sm-5">
                    <h5>Our Address</h5>
                    <address>
		              4th MAIN ROAD,
		              KHM BLOCK <br />
                      RT NAGAR BANGALORE<br /><br/>
                      <h5>Contact Us</h5>
		              Store Landline: 080-2334716 <br />
		              Phone Numer : 7996293760 <br />
		              E-Mail: <a href="mailto:gpsuhas20@@gmail.com" >
                         gpsuhas20@gmail.com</a>
                    </address>
                </div> 
                <div className="col-11 offset-1 col-sm-5 ">
                    
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.210696164207!2d77.58947291409599!3d13.022250590822683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b0b8ca8bf7%3A0x401f13df09cce5db!2sSri%20Balaji%20Stores!5e0!3m2!1sen!2sin!4v1597945725467!5m2!1sen!2sin" ></iframe>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className=" col-12 col-sm-2"><h4 style={{textAlign:"center"}}>Payments Options</h4></div>
                <div className=" col-6  col-sm-2 btn menu">
        <img src={`${process.env.PUBLIC_URL}/images/phonepe.png`}style={{width:"20px"},{height:"20px"}}></img>

        </div>
        <div className="col-6 col-sm-2  btn menu">
        <img src={`${process.env.PUBLIC_URL}/images/googlepay.png`}style={{width:"20px"},{height:"20px"}}></img>

        </div>
        <div className=" col-6 col-sm-2  btn menu">
        <img src={`${process.env.PUBLIC_URL}/images/amazon.png`}style={{width:"20px"},{height:"20px"}}></img>

        </div>
        <div className="col-6 col-sm-2   btn menu">
        <img src={`${process.env.PUBLIC_URL}/images/paytm.png`}style={{width:"15px"},{height:"15px"}}></img>

        </div>
        <div className="offset-2  offset-sm-0 col-6 col-sm-2"><p style={{margintop:"20px"}}>Cash On Delivery</p></div>
            </div>
            <div className="row ">             
                <div className="offset-2 col-10 offset-sm-4 col-sm-6 ">
                    
                    <p>© Copyright 2020 Sri Balaji Stores</p>
                </div>
            </div>
        </div>
    </div>
    
    )
      
    
}
export default Footer