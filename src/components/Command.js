import React from 'react';





class Command extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isProgramListExpanded: props.isProgramListExpanded,
      isProgramSelected: props.isProgramSelected,
      selectedProgram: props.selectedProgram | {},
      programs: [
        {id: 1, name: 'xtrabackup', shortDesc: 'Best online backup tool'},
        {id: 2, name: 'ls', shortDesc: 'Tool lets you '},
        {id: 3, name: 'mysqldump', shortDesc: 'Do logical backups'}
      ]
    };
    this.selectProgram = this.selectProgram.bind(this);
  }

  selectProgram(program) {
    this.setState({ selectedProgram: program })
  }

  render() {
    return (
      <div id="command">

        

      </div>
    );
  }
}

export default Command;
