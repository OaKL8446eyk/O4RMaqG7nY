// 代码生成时间: 2025-08-25 00:47:13
const isRequired = value => value.trim() !== "";

// 验证邮箱格式
const isEmail = value => /^[^@]+@[^@]+\.[^@]+$/.test(value);

// 验证电话号码格式
const isPhone = value => /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value);

// 表单数据验证器
class FormValidator {
  #errorMessages;

  constructor() {
    this.#errorMessages = {};
  }

  // 添加错误信息
  addErrorMessage(field, message) {
    this.#errorMessages[field] = message;
  }

  // 校验单个字段
  validateField(field, value, validator) {
    if (!validator(value)) {
      this.addErrorMessage(field, `The field ${field} is invalid.`);
    }
  }

  // 校验整个表单
  validate(fields) {
    for (const [field, value] of Object.entries(fields)) {
      const validator = this[field + "Validator"];
      if (validator) {
        this.validateField(field, value, validator);
      }
    }

    // 返回最终的错误信息
    return Object.values(this.#errorMessages).join("
");
  }

  // 特定字段的验证器
  nameValidator = isRequired;
  emailValidator = isEmail;
  phoneValidator = isPhone;
}

// 使用示例
const formValidator = new FormValidator();

const fieldsToValidate = {
  name: "",
  email: "example@example.com",
  phone: "123-456-7890"
};

const errors = formValidator.validate(fieldsToValidate);

if (errors) {
  console.error("errors: ", errors);
} else {
  console.log("Validation passed");
}