import bcrypt from "bcrypt";

export const hashing={
    SALT:10,
     hashedPassword(myPlaintextPassword:string):string{
        console.log(this.SALT)
        return bcrypt.hashSync(myPlaintextPassword,this.SALT);
     },
     comparePassword(plainpassword:string,hashedPassword:string){
        return  bcrypt.compareSync(plainpassword,hashedPassword)
     }

}