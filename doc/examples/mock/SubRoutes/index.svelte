<script>
  import SubRoute1 from './SubRoute1';
  import SubRoute2 from './SubRoute2';
  import { Route, Redirect } from '../../../Router';
</script>

<div>
  <Route path="/sub1">
    <SubRoute1 />
  </Route>

  <Route path="/sub2">
    <SubRoute2 />
  </Route>
</div>

<Redirect to="/sub2" />
