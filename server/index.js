const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('../proto/user.proto')
const userProto = grpc.loadPackageDefinition(packageDefinition)

var users = [];

const server = new grpc.Server()

server.addService(userProto.UserService.service, {
    "create" : createUser,
    "read": readUser,
    "readAll": readAllUsers
})

server.bindAsync(
    "127.0.0.1:8989",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => { 
        if(err) console.error(`Error : ${err}`)
        else {
            console.log("Server running on port = " + port)
            server.start()
        }
     }
)


function createUser(call, callback) {
    if(!call.request){
        throw new Error("Provide user in request");
    }
    users.push(call.request)
    callback(null, call.request)
}

function readUser(call, callback) {
    if(!call.request) {
        throw new Error("Provide user id in request");
    }
    const selectedUsers = users.filter(u => u.id === call.request.id);
    const user = selectedUsers?.length > 0 ? selectedUsers[0] : null;
    callback(null, user)
}

function readAllUsers(call, callback) {
    return callback(null, {users});
}
