// 代码生成时间: 2025-08-07 16:05:05
const formValidator = (formData) => {
  // 定义表单验证规则对象
  const rules = {
    username: {
      required: true,
      minLength: 4
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minLength: 8
    }
  };
  
  // 存储验证结果
  const validationResults = {};
  
  // 定义验证方法
  const validateField = (fieldName, value) => {
    const fieldRules = rules[fieldName];
    if (!fieldRules) return;
    
    let errors = [];
    
    if (fieldRules.required && (!value || value.trim() === '')) {
      errors.push(`"${fieldName}" is required`);
    }
    
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors.push(`"${fieldName}" must be at least ${fieldRules.minLength} characters long`);
    }
    
    if (fieldRules.email && !/^\S+@\S+\.\S+$/.test(value)) {
      errors.push(`"${fieldName}" must be a valid email address`);
    }
    
    validationResults[fieldName] = errors;
  };
  
  // 遍历表单数据进行验证
  for (const field in formData) {
    validateField(field, formData[field]);
  }
  
  // 检查是否存在验证错误
  const hasErrors = Object.values(validationResults).some(errors => errors.length > 0);
  
  if (hasErrors) {
    throw new Error('Validation failed: ' + JSON.stringify(validationResults));
  } else {
    return validationResults;
  }
};

// Example usage:
try {
  const formData = { username: 'john', email: 'john@example.com', password: '123456' };
  const errors = formValidator(formData);
  console.log('Validation passed:', errors);
} catch (error) {
  console.error('Validation error:', error.message);
}

// 注意：
// - 这个函数不处理异步验证，如与服务器的API交互。
// - 它仅适用于同步验证，如客户端表单提交前验证。
// - 可以根据需要扩展规则对象和验证函数以包含更多的验证规则。