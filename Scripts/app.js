//IIFE -- Immediately invoked function express
//AKA anonymous self-executing function
(function()
{
    function DisplayHome()
    {
        console.log("Home Page");

        //let AboutUsButton = document.getElementById("AboutUsButton");

        //1) Largest memory footprint
        //The jQuery way - returns an array (collection) of elements that match the query and attaches a click event
        /*$("#AboutUsButton").on("click",function() 
        {
            location.href = "about.html";
        });*/

        //2) 2nd largest memory footprint
        /*document.querySelectorAll("#AboutUsButton").forEach(element =>
        {
            element.addEventListener("click",() => 
            {
                location.href = "about.html";
            });
        });*/

        //Also lean
        /*document.querySelectorAll(#AboutUsButton).addEventListener("click", () =>
        {
            location.href = "about.html";
        });*/

        //3) Least memory footprint 
        document.getElementById("AboutUsButton").addEventListener("click", () => 
        {
            location.href = "about.html";
        });

        /*document.querySelectorAll("#AboutUsButton").forEach(function(element)
        {
            element.addEventListener("click",function(){
                location.href = "about.html";
            })
        })*/

        /*AboutUsButton.addEventListener("click", function()
        {
            location.href = "about.html";
        });*/

        //Step 1 - get a reference to an entry point(s) (insertion / deletion point)
        //let MainContent = document.getElementsByTagName("main")[0];
        let DocumentBody = document.body;
        
        //Step 2 - Create an HTML element in memory
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">
        This is the Article Paragraph</p>`;

        

        //Step 3 - Configure new element
        // MainParagraph.setAttribute("id","MainParagraph");



        // MainParagraph.setAttribute("class","mt-3");
        // let FirstString = "Adding some sickass shit ";
        // let SecondString = `${FirstString} to the main paragraph.`;
        // MainParagraph.textContent = SecondString;
        Article.setAttribute("class","container");

    
        
        //Step 4 - Perform insertion / deletion

        
        //Example of Insert After / Append
        //MainContent.appendChild(MainParagraph);

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);

        Article.innerHTML = ArticleParagraph;
        $("body").append(`
        <article class ="container">
            <p id="ArticleParagraph" class="mt-3">
                This is the Article Paragraph
            </p>
        </article>`);
        
        let zoe = new core.Contact("Zoe Straw","5555555555", "Zoe@zoemail.net");
        console.log(zoe.toString());
    }

/**
 *Adds a contact object to the localStorage
 *
 * @param {*} fullName
 * @param {*} contactNumber
 * @param {*} emailAddress
 */
function AddContact(fullName, contactNumber, emailAddress)
    {
        console.log("AddContact called");
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0,1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }


    function DisplayAboutPage()
    {
        console.log("About Us")
    }

    function DisplayProjectsPage()
    {
        console.log("Projects page")
    }

    function DisplayServicesPage()
    {
        console.log("Services")
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page")

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckBox");

        sendButton.addEventListener("click",function(event)
        {
            event.preventDefault();
            if(subscribeCheckBox.checked)
            {
                if(contact.serialize())
                {
                    console.log("Called AddContact");
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                }
            }
        })
    }

    function DisplayContactListPage()
    {
        console.log("Contact List Page")
        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = ""; // data container -> deserailized data from localStorage

            let keys = Object.keys(localStorage); // Returns a string array of of keys

            let index = 1; // Counts how many keys

            //For every key in the keys array (collection) loop
            for (const key of keys) 
            {
                let contactData = localStorage.getItem(key); // Get localStorage data value related to the key

                let contact = new core.Contact(); // Create new empty contact object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm">Edit</i></button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm">Delete</i></button></td>
                </tr>`;

                


                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click",() =>
            {
                location.href = "edit.html#add";
            })

            $("button.delete").on("click", function() 
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }

                //Refresh after deleting
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function() 
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page.");

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg">Add</i>`);

                    $("#editButton").on("click",(event)=>
                    {
                        event.preventDefault();
                        //Add a contact
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        //Refresh the contact-list page
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click()",() =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
            default:
                {
                    console.log("edit mode loaded");
                    //Get the contact info from local storage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    console.log(contact.toString());

                    //Display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    //When the editButton is pressed - update the contact
                    $("#editButton").on("click", (event) => 
                    {
                        console.log("Edit button pressed");
                        event.preventDefault();

                        //get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        //replace the item in local storage
                        localStorage.setItem(page,contact.serialize());

                        //Return to the contact list
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click",() =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;

        }
    }

    //named function
    function Start()
    {
        console.log("Hello, World!");

        switch(document.title)
        {
            case "Home Page":
                DisplayHome();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Our Projects":
                DisplayProjectsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "Contact-List":
                DisplayContactListPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
        }
    }

    window.addEventListener("load", Start());

})();