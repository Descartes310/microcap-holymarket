import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import { RctCard, RctCardContent } from 'Components/RctCard';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";


const Filters = (props) => {
   return (
      <div className="filters-wrapper">
         <RctCard>
            <RctCardContent>
               <FormControl>
                  <Input
                     type="text"
                     name="search"
                     placeholder={'Recherchez...'}
                     onChange={event => alert(event.target.value)}
                  />
               </FormControl>
            </RctCardContent>
         </RctCard>
         <RctCard className="brand">
            <RctCardContent>
               <h2>Vendeur</h2>
               {[...new Set(props.products.map(p => p.seller))].map(seller => (
                  <FormGroup className="col-sm-12 has-wrapper">
                     <FormControlLabel control={
                        <Checkbox
                           color="primary"
                           onChange={() => alert('chnaged')}
                        />
                     } label={seller}
                     />
                  </FormGroup>
               ))}
            </RctCardContent>
         </RctCard>
         <RctCard className="categories">
            <RctCardContent>
               <h2>Type</h2>
               {[...new Set(props.products.map(p => p.type))].map(type => (
                  <FormGroup className="col-sm-12 has-wrapper">
                     <FormControlLabel control={
                        <Checkbox
                           color="primary"
                           onChange={() => alert('chnaged')}
                        />
                     } label={type}
                     />
                  </FormGroup>
               ))}
            </RctCardContent>
         </RctCard>
      </div>
   )
}
export default Filters;