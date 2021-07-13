import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  title, errorMessage, visible, onSubmit, onCancel, children,
}) => (
  <>
    <div
      className={`${visible ? 'show ' : ''}modal fade`}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onCancel}
            />
          </div>
          <div className="modal-body">
            {errorMessage ? (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            ) : null}

            <div>
              {children}
            </div>

          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onCancel}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    {visible ? <div className="show modal-backdrop fade" /> : ''}
  </>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Modal;
