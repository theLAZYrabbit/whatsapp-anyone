import React from 'react';
import IntlTelInput from 'react-intl-tel-input';
import CountryDropdown from './CountryDropdown';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: '+91',
      contact: '',
      messageText: 'Hello 👋',
      showCCPrompt: false,
    }
  }

  handleInputChange = (a, b, c) => {
    // console.log(a);
    // console.log(b);
    // console.log(c);

    // const target = ev.target;
    this.setState({
      countryCode: `+${c.dialCode}`.replace(/[^0-9]/g, ''),
      contact: b.replace(/[^0-9]/g, ''),
      
    });
  }

  handleFlagChange = (a,b,c,d) => {
    
    this.setState({
      countryCode: `+${b.dialCode}`.replace(/[^0-9]/g, ''),
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    const fullContact = this.state.countryCode + this.state.contact;
    const encodedMsg = encodeURIComponent(this.state.messageText);

    const waLink = `https://wa.me/${fullContact}?text=${encodedMsg}`;
    window.open(waLink, "_black");
  }

  render() {
    return (

      <form className="wa-form" onSubmit={this.handleSubmit}>
        <div className={`error ${this.state.showCCPrompt ? 'error-visible' : ''}`}>
          <div className="arrow">⤴</div> <div> make sure to enter country code</div>
        </div>
        <div className="form-inputs">
          {/* <input
            type="number"
            name="contact"
            onChange={this.handleInputChange}
            minLength="8"
            maxLength="15"
            placeholder="Contact number" /> */}
            <IntlTelInput
            preferredCountries={['in']}
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            fieldName="contact"
            onPhoneNumberChange={this.handleInputChange}
            onSelectFlag={this.handleFlagChange}
      // onPhoneNumberBlur={onBlur()}
    />
          <button type="submit">SEND</button>
        </div>
      </form>
      // <>
      // <style jsx global>{`
      //   #wa-form > * {
      //     max-width: 100%;
      //     width: 400px;
      //   }
      // `}</style>

      // <form onSubmit={this.handleSubmit} id="wa-form" className="my-5 d-flex flex-column align-items-center">
      //   {/* <CountryDropdown
      //     name="countryCode"
      //     value={this.state.countryCode}
      //     onChange={this.handleInputChange}
      //   /> */}

      //   <div className="form-group">
      //     <div className="input-group">
      //       {/* <div className="input-group-prepend">
      //         <span className="input-group-text">{this.state.countryCode}</span>
      //       </div> */}
      //       <input
      //         name="contact"
      //         type="tel"
      //         onChange={this.handleInputChange}
      //         className="form-control form-control-lg"
      //         placeholder="contact number"
      //       />
      //     </div>
      //   </div>

      //   {/* <div className="form-group">
      //     <textarea
      //       className="form-control"
      //       onChange={this.handleInputChange}
      //       name="messageText"
      //       rows="3"
      //       placeholder="Message (Optional)"></textarea>
      //   </div> */}

      //   <button type="submit" className="btn btn-success" >Start WhatsApp Chat</button>
      // </form>
      // </>
    )
  }
}

export default Form;