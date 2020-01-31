const POSTS_TABLE_HTML = `<h2>Handlebars template to populate a table</h2>
<h3>POSTS</h3>
<table>
    <tr>
        <th>Id</th>
        <th>UserId</th>
        <th>Title</th>
        <th>Body</th>
    </tr>
    {{#each posts}}
    <tr>
        <td >
            {{id}}
        </td>
        <td>
           {{userId}}
        </td>
        
            <td>
            <a href="{{id}}">
            {{title}}</a></td>
        
        <td>{{body}}</td>
    </tr>
    {{/each}}
</table>`;

const POSTS_DETAILS = `<p>{{id}} </br> {{userId}} </br> {{title}} </br> {{body}}</p>`;

module.exports = {
  POSTS_TABLE_HTML,
  POSTS_DETAILS
};
