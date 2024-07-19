import PropTypes from 'prop-types'
import { documentTypeList } from '../lib/hardcoded'

const UserData = ({ user }) => {
  const docTypeLabel =
    documentTypeList.find(({ value }) => value === user.tipoId)?.name || ''

  return (
    <div className="user-data">
      <div className="user-name">
        <p className="name-label">Nombre:</p>
        <p className="name-value">{user.nombre}</p>
      </div>
      <div className="tipo-doc">
        <p className="tipo-doc-label">Tipo de documento:</p>
        <p className="tipo-doc-value">{docTypeLabel}</p>
      </div>
      <div className="num-doc">
        <p className="num-doc-label">Número de documento:</p>
        <p className="num-doc-value">{user.numeroId}</p>
      </div>
      <div className="edad">
        <p className="edad-label">Edad:</p>
        <p className="edad-value">{user.edad}</p>
      </div>
      <div className="telefono">
        <p className="telefono-label">Teléfono BH:</p>
        <p className="telefono-value">{user.telefono}</p>
      </div>
      <div className="correo">
        <p className="correo-label">Correo BH:</p>
        <p className="correo-value">{user.correo}</p>
      </div>
      <div className="contrato">
        <p className="contrato-label">Contrato:</p>
        <p className="contrato-value">{user.contrato}</p>
      </div>
      <div className="plan">
        <p className="plan-label">Plan:</p>
        <p className="plan-value">{user.plan}</p>
      </div>
      <div className="telefono-form">
        <p className="telefono-form-label">Teléfono de contacto:</p>
        <p className="telefono-form-value">{user.telefonoContacto}</p>
      </div>
      <div className="email-form">
        <p className="email-form-label">Correo formulario:</p>
        <p className="email-form-value">{user.correoFormulario}</p>
      </div>
      <div className="fecha">
        <p className="fecha-label">Recibida:</p>
        <p className="fecha-value">{user.fechaConversacion}</p>
      </div>
      <div className="skill">
        <p className="skill-label">Ingresa por:</p>
        <p className="skill-value">{user.tipificacion}</p>
      </div>
      <div className="contratos-eps">
        <p className="contratos-eps-label">Contratos de EPS:</p>
        <p className="contratos-eps-value">{user.contratoEps}</p>
      </div>
      <div className="contratos-familia">
        <p className="contratos-familia-label">Contratos y familia:</p>
        <p className="contratos-familia-value">{user.contratosFamilia}</p>
      </div>
      <div className="id-conversacion">
        <p className="id-conversacion-label">Id conversación:</p>
        <p className="id-conversacion-value">{user.idConversacion}</p>
      </div>
    </div>
  )
}

UserData.propTypes = {
  user: PropTypes.any.isRequired,
}

export { UserData }
