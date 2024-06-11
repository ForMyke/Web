import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../css/registro.css";

const Registro = () => {
  return (
    <div className="container mt-5 mb-4">
      <h2 className="text-center">Vamos a hacerte un Xclusive member.</h2>
      <p className="text-center">
        Hemos enviado un código a <strong>golomian72@hotmail.com</strong>{" "}
      </p>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Nombre*</Form.Label>
            <Form.Control type="text" placeholder="Nombre" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Apellidos*</Form.Label>
            <Form.Control type="text" placeholder="Apellidos" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña*</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" />
          <Form.Text className="text-muted">
            <ul>
              <li>8 caracteres como mínimo</li>
              <li>Letras mayúsculas, minúsculas y un número</li>
            </ul>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preferencia de compra*</Form.Label>
          <Form.Select>
            <option>Elige una opción</option>
            <option>Ropa</option>
            <option>Calzado</option>
            <option>Accesorios</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento*</Form.Label>
          <Form.Control type="date" />
          <Form.Text className="text-muted">
            Consigue una recompensa de Xclusive Member por tu cumpleaños.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox1">
          <Form.Check
            type="checkbox"
            label="Regístrate para recibir correos electrónicos y no perderte las actualizaciones de productos, ofertas y ventajas para Members."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox2">
          <Form.Check
            type="checkbox"
            label="Acepto la Política de privacidad y los Términos de uso de Nike."
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Crear una cuenta
        </Button>
      </Form>
    </div>
  );
};

export default Registro;
