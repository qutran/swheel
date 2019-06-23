<script>
  import Theme from './theme';
  import Layout from './components/Layout';
  import { Router, Route } from '../src/Router';
  import Basic from './examples/Basic';
</script>

<Theme>
  <Layout>
    <Router>
      <Route path="/">
        <Basic />
      </Route>
    </Router>
  </Layout>
</Theme>
