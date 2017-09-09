import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query : query.trim()})
  }

  render() {
    let showingContacts
    if (this.state.query) {
      // escapeRegExp : if there are any special characters such as '\' or '$'
      // then go ahead and escape them. 즉, 그냥 string으로 사용한다는 말이다. 뒤의 'i'는
      // ignoreCase를 뜻한다.
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = this.props.contacts
    }

    return (
      <div className='list-contacts'>
        {JSON.stringify(this.state.query)}
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search cotnacts'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
        </div>
        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts;


// class ListContacts extends Component {
//   render() {
//     console.log('Props', this.props)
//     return(
//       <ol className='contact-list'>
//         {this.props.contacts.map((contact) => (
//           <li key={contact.id}>
//             {contact.name}
//           </li>
//         ))}
//       </ol>
//     )
//   }
// }

