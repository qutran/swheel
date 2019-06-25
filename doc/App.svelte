<script>
  import Theme from './theme';
  import Layout from './components/Layout';
  import ExamplesPage from './pages/Examples';
  import { Router, Route } from '../src/Router';
</script>

<Router>
  <Theme>
    <Layout>
      <Route path="/examples">
        <ExamplesPage />
      </Route>
    </Layout>
  </Theme>
</Router>
