const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'минимальная длинна 2 символа'],
      maxlength: 30,
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },

    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: 'Неправильный формат почты',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false, timestamps: true,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .then((user) => {
            if (!user) {
              return Promise.reject(new Error('Неправильные почта или пароль'));
            }

            return bcrypt.compare(password, user.password)
              .then((matched) => {
                if (!matched) {
                  return Promise.reject(new Error('Неправильные почта или пароль'));
                }

                return user; // теперь user доступен
              });
          });
      }
    }

  },
);


module.exports = mongoose.model('user', userSchema);
