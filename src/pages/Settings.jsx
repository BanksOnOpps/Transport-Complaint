import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1.5rem;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const AvatarPreview = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  /* background-color: var(--color-brand-400); */
  background: linear-gradient(135deg, #2f2a89, #2dd4bf);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: #005fcc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
    avatarPreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatar: file,
      avatarPreview: preview,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Wrapper>
      <Title>Update Account Settings</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Profile Picture</Label>
          <div>
            {formData.avatarPreview && (
              <AvatarPreview src={formData.avatarPreview} alt="Avatar" />
            )}
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Leave blank to keep current"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit">Save Changes</Button>
      </Form>
    </Wrapper>
  );
}

export default Settings;
