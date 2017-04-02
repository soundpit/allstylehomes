/*set my linting options to consider jquery and the DOM */

/*jslint browser: true*/
/*global $ */

window.onload = function() {
    
    // This function fires when the page has fully loaded.
    
    //do the stuff thats for every page
    set_time();
    set_mail();
    
    //get an array and pop out the last part of the array..
    //it will be the filename.
    var fileName = location.pathname.split('/').pop();
       
    //check which page I am on and only load
    //those event handlers for that page.
    switch(fileName) {
        
        case "index.htm":
            //do nothing
            break;
        case "about.htm":
            about_images();
            break;
        case "designs.htm":
            designs_lighbox();
            break;
        case "process.htm":
            process_slider();
            break;
        case "faqs.htm":
            faq_accordian();
            break;
        case "testimonials.htm":
            // do nothing
            break;
        case "contact.htm":
            contact_validate();
            break;
        default:
            //no default
            
    } //end switch
      
}; //end onload

function set_time(){
    //sets the date at the bottom of the page
    var date = new Date();
    
    document.getElementById('footer').innerHTML = 
        
    ("<p> &copy;" + " " + date.getFullYear() + " " + "<a href='www.allstylehomes.com.au'> AllStyle Homes </a> | <a href='privacy_policy.htm'>Privacy policy</a></p>");
       
} // end set_time

function set_mail(){
    
    //i can use the regular submit button because the page 
    //tends to refresh and the paragraph thing
    //doesn't show 

    //set the event handler for the button
    document.getElementById('news_submit').addEventListener('click',set_mailing);
    
    function set_mailing(){

        var p_elem = document.getElementById('message');
        var msg_1 = document.getElementById('message_1');
        var msg_2 = document.getElementById('message_2');

        //reset the values
        p_elem.style.display = "none";
        msg_1.innerHTML = "";
        msg_2.innerHTML = "";
        
        //this sets up the mailing list. it will validate two fields,
        //the name and email.
        //the name will check for only alphanumeric characters or ""
        //the email will check for correct email only. I'll use regex
        //for both. 

        //set some messages
        var name_msg = "";
        var email_msg = "";

        //from stack overflow:
        var alpha_test = /^[a-zA-Z0-9_]*$/;

        //copied from www.emailregex.com:
        var email_test = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

        //check for valid name
        var x = document.getElementById("aside_submit_name").value;
		//split the string into separate words for checking
        var name_array = x.split(" ");

        //lopp through the names for invalid characters.
        //this takes into account if the user
        //puts in two names

        var valid = true;

         for (var i=0;i < name_array.length; i++){
            if (!alpha_test.test(name_array[i])) {
                valid = false;
                //break the loops
                 break; 
            }
        } //end for

        if (!x) { //check for blank spaces
            msg_1.style.display = "inherit";
            msg_1.innerHTML = "Name is blank.";
        } else if (valid === false){
            //found an invalid word             
            msg_1.style.display = "inherit";
            msg_1.innerHTML = "The name is invalid";
        } else {
            name_msg = "sucess";
        } //end if(!x)

        var y = document.getElementById("aside_submit_email").value;
        
        if (!y){ //check for blanks
            msg_2.style.display = "inherit";
            msg_2.innerHTML = "Email is blank.";
          }else  if (!email_test.test(y)){ //no blanks, check for valid email
            msg_2.innerHTML = "Invalid email address.";
        } else {
            email_msg = "sucess";
        } //end if (!y)

        //check for the messages. this is very messy
        if (email_msg === "sucess" && name_msg === "sucess") {
            p_elem.style.backgroundColor = "#DFF0D8";
            p_elem.style.color = "#3C763D";
            p_elem.style.borderColor = "#3C763D";
            p_elem.style.display = "inherit";
            msg_1.style.display = "inherit";
            msg_1.innerHTML = "You have successfully registered.";
            //check the validity
            valid = true;
        } else {
            p_elem.style.backgroundColor = "#F2DEDE";
            p_elem.style.color = "#A94442";
            p_elem.style.borderColor = "#A94442";
            p_elem.style.display = "inherit";
            valid = false;
        }
        
        //now run a function that removes messagebox after 3 seconds.
        setTimeout(function(){close_window();},3000);
        
        function close_window() {
            
            //get the form
            var frm = document.getElementById('sign_up');
            
            var drawer = document.getElementById('drawer');
            
            var height = drawer.clientHeight;
            
            //now shrink it back
            var shrink_loop = setInterval(function(){reduce();},20);
            
            function reduce(){
                
                //make the change and THEN check
                //it doesn't need to be exact :P
                height -= 2;
                
                // node.style.height = (node.clientHeight - 2) + "px";
                //check to see if its finished
                 drawer.style.height = height + "px";
                
                if (height < 0) {
                    
                    p_elem.style.display = "none";
                    drawer.style.height = "auto";
                    
                    if (valid === true){
                        //clear the fields
                        //only clears if the fields are valid.
                        //if not just leave it
                        frm.reset();                       
                    }
                    
                    clearInterval(shrink_loop);
                  
                }
            } // end reduce ()
        } // end close_window ()
          
    } // end set_mailing ()

} //end set mail ()


function about_images(){

    //this function shows the award images on the about page.
    //it will have the caption and a series of rotating trophy images
  
    //get the image element
    var img_element = document.getElementById("image_changer");
    
    var img_loop = setInterval( function (){swap_image();},3000);
    
    var counter = 2;
    
    function swap_image (){
    
        if (counter > 5) {
            //its the last image, start again
            counter = 1;
        }
             
        img_element.src = "images/trophies/trophy" +counter+".jpg";
        counter ++;
    }
   
} //end about_images

function designs_lighbox(){
    
    //do the x-button
	//a simple event handler for this one. don't need addevent listener.
    document.getElementById('close_button').onclick = function (){
        
        document.getElementById('design_lightbox').style.display = "none"; 
    
    };
  
    //sets up a full-screen lightbox for each of the house iamges
    var img_des = document.querySelectorAll(".designs_img");
    
    var i = 0;
    //loop through the classes and add the event listeners
    for (i=0;i<img_des.length;i++){
        
        //for some reason I need to assign the image to a variable 
        //before I attach the event in ie. it works ok for the others
        var x = img_des[i];
        x.addEventListener('click',click_me,false);
        //works!!
      }
     
    function click_me(){
        
         //the "this" keyword refers to the element that is clicked.
        //it loads the source and stuff
        document.getElementById('big_img').src = this.src;
        document.getElementById('design_lightbox').style.display = "inherit";
     }
} //end designs_lightbox

function process_slider(){
    
    //there is also a bug here...
    //if i double-click or click too fast on the either
    //of the buttons the process goes a bit 
    //wonky. not sure how to fix it.
    //it I wonder if I can find a way to stop the event from firing ..ah!..fixed!

    //sets up an interactive slider of the building process
    //grab all the li elements in the ul
    var li_elements = document.querySelectorAll('.slider');
    
    //set up the event handlers
    document.getElementById('button-next').addEventListener('click',next);
    document.getElementById('button-prev').addEventListener('click',prev);
    
    //this is the currently displayed element.
    //its the index number
    var current_element = 0; 
    
    //display the first one
    li_elements[current_element].style.display = "inherit";
    //hide the back button
    document.getElementById('button-prev').style.display = "none";
    
    //the the value to fix the bug incase the user clicks while
    //the animation event is already firing 
    var firing = false;
    
    function next(){
        
         /* this works, but i'll try some animation
        li_elements[current_element+1].style.display = "initial";
        li_elements[current_element].style.display = "none";
        current_element++;
         */  
 
       if (firing === true) {
           //the animation is still playing. exit
           //stops double or too fast clicks from mucking
           //up the order. 
           return;
       }
        
        //ok, evdiently you can only set styles and not read them
        //you need to use getComputedStyle which doesn't work
        //on ie8. bummer. 
        
        //but you can use client width and height and top and left.
        //so it should be easy enough?
        var el = li_elements[current_element];
        
        //hard-code the width there otherwise its auto and
        //strang things happen. 
        el.style.width = el.clientWidth + "px";
        el.style.borderRight= "5px solid black";
        
        //set the move counter
        var move =0;
        
        //set the layering
        el.style.zIndex = "20";
        li_elements[current_element+1].style.zIndex = "10";
        li_elements[current_element+1].style.display = "inherit";
          
        //set the animation loop
        var my_loop = setInterval( function (){swap();},10);

        function swap(){
        
            if (move >= el.clientWidth) {
                
                //it's reached it's limit.
                el.style.display = "none";
                el.style.borderRight = "none";
                el.style.left = "0px";
              
                //increment for the nextelement
                current_element++;
                clearInterval(my_loop);
                
                //reset the firing pin
                firing=false;
                
            }else{
                firing=true;
                move += 10;
                el.style.left = '-' + move +'px';
            }
        
        } //end swap()
                   
        //remove the next arrow
        if (current_element === 10) {
             document.getElementById('button-next').style.display = "none";
        }
        
        // reinstate the back arrow
        document.getElementById('button-prev').style.display = "inherit";
        
           
     } // end next()
    
    function prev(){
    
        /*
        li_elements[current_element-1].style.display = "initial";
        li_elements[current_element].style.display = "none";
        current_element--;
        */
        
        if (firing===true){
            return;
        }
        
        //now do everything in reverse.
        var el = li_elements[current_element];
        
        //hard-code the width there otherwise its auto and
        //strang things happen. 
        el.style.width = el.clientWidth + "px";
        el.style.borderLeft = "5px solid black";
          
        //set the move counter
        var move =0;
        
        //set the layering
        el.style.zIndex = "20";
        li_elements[current_element-1].style.zIndex = "10";
        li_elements[current_element-1].style.display = "inherit";
        
        //set the animation loop
        var my_back_loop = setInterval( function (){back_swap();},10);

        function back_swap(){
        
            if (move >= el.clientWidth) {
                //it's reached it's limit.
                el.style.display = "none";
                el.style.left = "0px";
                el.style.borderLeft = "none";
                //increment for the nextelement
                current_element--;
                clearInterval(my_back_loop);
                
                firing=false;
            }else{
                firing=true;
                move += 10;
                el.style.left =  move +'px';
            }
        
        } //end swap()
                   
        //remove the back arrow
        if (current_element === 1) {
             document.getElementById('button-prev').style.display = "none";
        }
        
        // reisntate the next arrow
        document.getElementById('button-next').style.display = "inherit";
        
      } // end prev
} // end process slider 

function faq_accordian(){
    
    //get the whole list
    
    //creates the faq accordian style.
    var questions = document.querySelectorAll(".question");
    
    var i = 0;
    //loop through the classes and add the event listeners
    for (i=0;i<questions.length;i++){
        
        //for some reason I need to assign the image to a variable 
        //before I attach the event in ie. it works ok for the others
        var x = questions[i];
        //console.log(i);
        x.addEventListener('click',click_question,false);
    } //end for
    
    //get the current answer that's being shown
    var current_answer; //not sure what it is yet
    
    //I might need a "current_state" variable to keep
    //track of the current_nodes condition..
    
    function click_question(){
              
        //find the next element sibling
        var next_sibling = this.nextSibling;
        
        //skip the text nodes and white space nodes
        //and only fire when en element node is found
        while (next_sibling.nodeType != 1){
          next_sibling = next_sibling.nextSibling;
        }
       
        // console.log("answer height = " + next_sibling.clientHeight);
        // console.log("child height = " + next_sibling.children[0].clientHeight);
        // console.log("current answer = " + current_answer);
        
        //check to see if its already expaned.
        if (next_sibling.clientHeight <= 0) {
            //its closed..so open
             change_state("grow",next_sibling);
               
            //now check to see if any other nodes
            //are open
            //check current_answer
            if (current_answer) {
                //there is one open..so close it
                change_state("shrink",current_answer);
            } else {
                //there is no currently open answer..so do nothing
            }
            
            current_answer = next_sibling;
                
        } else {
            //its open
            change_state("shrink",next_sibling);
            
            current_answer = undefined;
            //there shoud be no other nodes open now.
            //should set current answer but not sure how yet
            
        } // end check for height       
    } //end click question
    
    //try for some animation. i'll merge the grow and
    //collapse animations, see if I can do it.
    function change_state(method,node){
        
        //this is a test to check for type safety
        var integer = node.clientHeight;
        
        //we are changing the li elements height
        // find the p element
        var child = node.children[0];
        
        //set the animation loop
        var faq_loop = setInterval( function (){faq_swap();},1);

        function faq_swap(){
            
            if (method === "shrink") {
                //make the change and THEN check
                //id doesn't need to be exact :P
                integer -= 2;
               // console.log (integer);
              //  console.log (node.style.height);
                
               // node.style.height = (node.clientHeight - 2) + "px";
                //check to see if its finished
                 node.style.height = integer + "px";
                
                if (integer < 0) {
                   
                    clearInterval(faq_loop);
                }
                
               
            } else if (method === "grow"){
                
                //there is a bug here
                //the first time around
                //the style.height is 0
                //the second time, its a string 0px
                //parseInt?
                   // node.style.height = undefined;
                
               // console.log("grow");
                //finish check
               //  console.log("node style" + node.style.height);
              //  console.log("node client" + node.clientHeight);
              //  console.log("child client" + child.clientHeight);
                // F**KING DONE!!
                //the bug was that trying to add
                // node.style.height and node.clientHiegh produced a 
                //damn type mismatch. :P stupid javascript
                
                integer += 2;
               // node.style.height = ((node.clientHeight + 2)+ "px");
                
                node.style.height = integer + "px";
    
                if (integer > (child.clientHeight+10)) {
                    //big enough..stop
                   
                    clearInterval(faq_loop);
                }              
            } //end if method            
        } //end swap()
     } // end change state
} // faq accordian



function contact_validate (){

    //contact form validation and emailing

}

