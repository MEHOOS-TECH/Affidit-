const supabaseUrl = 'https://eefuslcthzshlywnvmxh.supabase.co'

const supabaseKey = 'sb_publishable_Cg5ruwk1M0879b51EhASnw_MojwW174'

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
)

async function createUser(){

  const username = document.getElementById('username').value
  const email = document.getElementById('email').value

  const referralCode =
    username + Math.floor(Math.random() * 1000)

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        username: username,
        email: email,
        referral_code: referralCode
      }
    ])

  if(error){
    document.getElementById('status').innerText =
      error.message
    console.log(error)
    return
  }

  document.getElementById('status').innerText =
    'User created successfully'

  loadUsers()
}

async function loadUsers(){

  const { data, error } = await supabase
    .from('users')
    .select('*')

  if(error){
    console.log(error)
    return
  }

  const usersDiv = document.getElementById('users')
  usersDiv.innerHTML = ''

  data.forEach(user => {

    usersDiv.innerHTML += `
      <div class="user">
        <h3>${user.username}</h3>
        <p>${user.email}</p>
        <p>Referral: ${user.referral_code}</p>
        <p>Balance: ${user.balance}</p>
      </div>
    `
  })
}

loadUsers()
