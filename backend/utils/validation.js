const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'student'], { required_error: 'Role is required' }),
  department: z.string().optional(),
  year: z.number().min(1).max(4).optional()
}).refine(data => {
  if (data.role === 'student') {
    return data.department && data.year;
  }
  return true;
}, {
  message: 'Department and year are required for students',
  path: ['department', 'year']
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['admin', 'student'], { required_error: 'Role is required' })
});

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date format'),
  time: z.string().min(1, 'Time is required'),
  department: z.string().min(1, 'Department is required'),
  year: z.number().min(1).max(4, 'Year must be between 1 and 4')
});

module.exports = {
  registerSchema,
  loginSchema,
  eventSchema
};