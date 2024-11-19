import React from 'react';
import AdminLayout from '../../components/AdminLayout';

const ContactUs = () => {
  const contactData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', message: 'I need help with my account.' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', message: 'How can I reset my password?' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com', phone: '555-666-7777', message: 'I am facing a technical issue.' },
  ];

  return (
    <AdminLayout title={"Contact us List"}>
    <div className="p-6  mx-auto bg-white shadow-md rounded-md">
      {/* <h1 className="text-2xl font-bold mb-4">Contact Us Submissions</h1> */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contactData.map((contact) => (
            <tr key={contact.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  );
};

export default ContactUs;
