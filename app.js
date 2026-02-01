const supabaseUrl = "https://yriavudtqkiysptwbwbm.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyaWF2dWR0cWtpeXNwdHdid2JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxOTk0MjAsImV4cCI6MjA3ODc3NTQyMH0.GTlgNXzjQbZ41W6iUWEIGzFaoWC3xJxsVQ2vntKpO-o"
const create = supabase.createClient(supabaseUrl, supabaseKey)

console.log(create);

let form =  document.getElementById('my_form')

let login_form = document.getElementById('login_form')

let appoinmentform = document.getElementById('appoinmentform')

let slip = document.getElementById('slip')



if(form){

    form.addEventListener('submit' , async function (e) {
        e.preventDefault()
        
        
        let name = document.getElementById('name')
        
        let password = document.getElementById('password')
        
        let mail = document.getElementById('email')
        
        let number = document.getElementById('number')
        


  const { error:dataauth } = await create
  .from('supabaseauth')
  .insert({ name: name.value , password: password.value , mail: mail.value , number: number.value })
  .select()

const { data, error } = await create.auth.signUp({
  email: mail.value,
  password: password.value
});


        


if (error) {
  alert(error.message);
  return;
}
  
        


        location.href ='login.html'
    })
}


if(login_form){

    login_form.addEventListener('submit' , async function(f){
        f.preventDefault()
        
        let login_email = document.getElementById('login_mail').value
        
        let login_password = document.getElementById('login_pass').value
        
const { data, error } = await create.auth.signInWithPassword({
    email: login_email,
    password: login_password
});
 
if(error){
    alert(error.message)
    return;
}
       
        
        location.href='dashboard.html'
    })
}


if(appoinmentform){
    appoinmentform.addEventListener('submit', async function(q){
 q.preventDefault()

        let appoinmentName = document.getElementById('ap-name')

        let appoinmentTime = document.getElementById('time')

        let appoinmentDes = document.getElementById('description')

        let appoinmentdropdown = document.getElementById('dropdown')

console.log(appoinmentName.value);

const { data: { user }, error: usererror  } = await create.auth.getUser()



const { data: appointmentData, error } = await create
  .from('appoinmentauth')
  .insert({ user_id: user.id, patientname: appoinmentName.value , doctorname: appoinmentdropdown.value , description: appoinmentDes.value , time: appoinmentTime.value , status: 'pending'})
  .select()


 if(error){
        alert(error.message);
        
    }
    else{
        alert('appoinment book by'+ appoinmentdropdown.value + '( pending )')
       
    }


//slip
slip.innerHTML = `
    
    <p>Patient: ${document.getElementById('ap-name').value}</p>
    <p>Doctor: ${document.getElementById('dropdown').value}</p>
    <p>Description: ${document.getElementById('description').value}</p>
    <p>Time: ${document.getElementById('time').value}</p>
    <p>Status: booked</p> `


let cancelbtn = document.getElementById('cancelbtn')
cancelbtn.style.display = "inline-block"

let appoinmentid = appointmentData[0].id

cancelbtn.addEventListener('click' , async function () {
    const { data, error } = await create
                .from('appoinmentauth')
                .delete()
                .eq('id', appoinmentid);

                if(error){
                    alert('Error Cancel Appoinment' + error.message)
                    return;
                }
                
                    cancelbtn.style.display = 'none'
                slip.remove()
})

})
   
}

