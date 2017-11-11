const mongoose = require('mongoose');
const Role = require('mongoose').model('Role');
const ObjectId = mongoose.Schema.Types.ObjectId;
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        passwordHash: {type: String, required: true},
        fullName: {type: String, required: true},
        articles: [{type: ObjectId, ref: 'Article'}],
        roles: [{type: ObjectId, ref: 'Role'}],
        salt: {type: String, required: true}
    }
);

userSchema.method ({
   authenticate: function (password) {
       let inputPasswordHash = encryption.hashPassword(password, this.salt);
       let isSamePasswordHash = inputPasswordHash === this.passwordHash;

       return isSamePasswordHash;
   }
});

userSchema.method ({
    isAuthor: function (article) {
        if (!article){
            return false;
        }

        return article.author.equals(this.id);

    }
});

userSchema.method ({
    isInRole: function (roleName) {
      return Role.findOne({name: roleName}).then(role => {
          if (!role){
              return false;
          }

          let isInRole = this.roles.indexOf(role.id) !== -1;
          return isInRole;
      })

    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.seedAdmin = () => {
    let email = 'admin@softuni.bg';
    User.findOne({email: email}).then(admin => {
        if (!admin){
            Role.findOne({name: 'Admin'}).then(role => {
                if (!role){
                    return;
                }
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword('admin', salt);
                let adminUser = {
                    email: email,
                    fullName: 'Admin',
                    roles: [role.id],
                    articles: [],
                    salt: salt,
                    passwordHash: passwordHash
                };

                User.create(adminUser).then(user => {
                    role.users.push(user.id);
                    role.save(err => {
                        if (err){
                            console.log(err.message)
                        } else {
                            console.log('Admin seeded successfully!')
                        }
                    });
                });
            })
        }
    })
};


