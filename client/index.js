const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('../proto/user.proto', {})
const userProto = grpc.loadPackageDefinition(packageDefinition)

const userService = new userProto.UserService(
    "127.0.0.1:8989",
    grpc.credentials.createInsecure()
)

function createUser(user){
    userService.create(user, (err, isCreated) => {
        if(err) console.error(`Error : ${err}`)
        else {
            if(isCreated) {
                console.log("User created");
                userService.read({ id : user.id }, (err, user) => {
                    if(err) {
                        console.error(`Error : ${err}`)
                        return
                    }
                
                    console.log(`User[id = 1] : ${JSON.stringify(user)}`);
                })
                userService.readAll({}, (err, users) => {
                    if(err) {
                        console.error(`Error : ${err}`)
                        return
                    }
                
                    console.log(`\n\nUsers : ${JSON.stringify(users)}`);
                })
            }
            else console.log("User not created")
        }
        
    })
    
    
}


setTimeout(() => {
    createUser({
        id: "78327",
        name: "Mohit Malhotra",
        email: "mohit.malhotra@barco.com",
        phone : "9811572680",
        region: "IN"
    })
}, 1000)


setTimeout(() => {
    createUser({
        id: "6890",
        name: "Yamini",
        email: "yaminip@barco.com",
        phone : "9811589683",
        region: "US"
    })
}, 2 * 1000)


// setTimeout(() => {
//     createUser({
//         id: "56387",
//         name: "Gaurav Bisht",
//         email: "gb@barco.com",
//         phone : "9811456680",
//         region: "UK"
//     })
// }, 3 * 1000)

