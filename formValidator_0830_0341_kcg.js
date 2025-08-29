// 代码生成时间: 2025-08-30 03:41:19
const formValidator = (formData) => {
  // 验证表单数据是否为空
  const isEmpty = (value) => value.trim() === "";

  // 验证电子邮件地址
  const isValidEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  // 验证姓名
  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  // 验证表单数据
  const validateForm = () => {
    let errors = {};
    if (isEmpty(formData.name)) {
      errors.name = 'Name is required';
    } else if (!isValidName(formData.name)) {
      errors.name = 'Name must contain only letters and spaces';
    }

    if (isEmpty(formData.email)) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    return errors;
  };

  // 返回验证结果
  return validateForm();
};

// 使用示例
const formData = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};

const errors = formValidator(formData);

if (Object.keys(errors).length === 0) {
  console.log("Form is valid");
} else {
  console.log("Form has errors", errors);
}