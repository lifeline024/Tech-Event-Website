import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css"; // Create this CSS file

function RegistrationForm({ event, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    participantName: "",
    registrationNo: "",
    mobileNo: "",
    email: "",
    transactionId: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamMembers, setTeamMembers] = useState(
    event.teamSize === "Single" ? 1 : 
    event.teamSize === "Double" ? 2 : 
    parseInt(event.teamSize.match(/\d+/)?.[0]) || 1
  );

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    // Validate required fields before proceeding
    if (step === 1 && (!formData.participantName || !formData.registrationNo || !formData.mobileNo)) {
      alert("Please fill all required fields before proceeding");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await axios.post("https://tech-event-website.onrender.com/api/registration/register", {
        eventId: event._id,
        ...formData,
        teamSize: event.teamSize
      });
      alert(res.data.message || "Registration successful!");
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      alert(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Register for {event.name}</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {[1, 2, 3].map((stepNumber) => (
            <div 
              key={stepNumber} 
              className={`step ${stepNumber === step ? 'active' : stepNumber < step ? 'completed' : ''}`}
            >
              <div className="step-number">{stepNumber}</div>
              <div className="step-label">
                {stepNumber === 1 ? 'Details' : stepNumber === 2 ? 'Payment' : 'Confirm'}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Participant Details */}
        {step === 1 && (
          <div className="form-step">
            <div className="event-details">
              <p><strong>Team Size:</strong> {event.teamSize}</p>
              <p><strong>Entry Fee:</strong> ₹{event.entryFee}</p>
              <p><strong>Prize Money:</strong> {event.prizeMoney}</p>
            </div>

            <div className="warning-note">
              <h4>Important Note:</h4>
              <ul>
                <li>Please fill all details accurately</li>
                <li>Name should match your college ID</li>
                <li>Registration number must be correct</li>
                <li>No changes or refunds will be processed after submission</li>
                {event.teamSize !== "Single" && (
                  <li>Team size: {event.teamSize}</li>
                )}
              </ul>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="participantName"
                value={formData.participantName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Registration Number</label>
              <input
                type="text"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>University Email (Team Leader)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="next-btn" onClick={nextStep}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Information */}
        {step === 2 && (
          <div className="form-step">
            <div className="payment-info">
              <h4>Payment Instructions</h4>
              <p>Please complete the payment using the QR code below and enter the transaction ID.</p>
              
              <div className="qr-container">
                <img src="/qr_img.jpg" alt="Payment QR Code" className="qr-code" />
                <div className="payment-details">
                  <p><strong>Amount:</strong> ₹{event.entryFee}</p>
                  <p><strong>UPI ID:</strong>ayushshri931@oksbi</p>
                </div>
              </div>

              <div className="form-group">
  <label>
    Transaction ID
    <strong style={{ color: "red" }}>*</strong>
  </label>
  <input
    type="text"
    name="transactionId"
    value={formData.transactionId}
    onChange={handleChange}
    required
    placeholder="Enter UPI Transaction ID"
  />
</div>
<p>Without Transaction id your registration is not applicable.</p>

            </div>

            <div className="form-actions">
              <button type="button" className="back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button type="button" className="next-btn" onClick={nextStep}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="form-step">
            <div className="confirmation-section">
              <h4>Please verify your details:</h4>
              
              <div className="review-details">
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{formData.participantName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Registration No:</span>
                  <span className="detail-value">{formData.registrationNo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Mobile:</span>
                  <span className="detail-value">{formData.mobileNo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">University Email: (Team Leader)</span>
                  <span className="detail-value">{formData.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Transaction ID:</span>
                  <span className="detail-value">{formData.transactionId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Event:</span>
                  <span className="detail-value">{event.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Team Size:</span>
                  <span className="detail-value">{event.teamSize}</span>
                </div>
              </div>

              <div className="final-warning">
                <p>⚠️ By submitting, you confirm all details are correct. No changes or refunds will be processed after submission.</p>
                <p><strong>Please take a screenshot of this process for your reference.</strong></p>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="back-btn" onClick={prevStep}>
                ← Back
              </button>
              <button 
                type="submit" 
                className="submit-btn" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Confirm Registration"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
