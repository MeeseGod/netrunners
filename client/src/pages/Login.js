export default function Login(){
    return (
        <div>
            <div>
                <form action="/api/users/login" method="post">
                    <label for="username">Username</label>
                    <input name="username" placeholder="username" type="text" />
                    <label for="password">Password</label>
                    <input name="password" placeholder="password" type="password" />
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
};