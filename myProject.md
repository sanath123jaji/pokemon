We have two pages in this , Grid View Page and Detail View Page

We have Common header with App Name which is clickable and navigates to Grid View Page, 

In Grid View, We have Pokemon in Grid, clicking on pokemon in grid, Respective Detail View is opened 
using RouterLink which inbuilt route functionality of Angular, We have built Pagination using Angular 
Material with options - first page, last page, next page and previous page. We have built spinner using 
Angular Material to show when data is being loaded.

In Detail View, We have Sub Header section where where we are showing Pokemon Name which users selected 
from grid view and back arrow, We have use Angular material for back arrow and clicking on back arrow takes 
user top previous page. We have two tabs as 'Details' and 'Evolution'. We have used Angular Material for Tabs.

Under Details tab, we are showing image of Pokemon , basic details and statistics of Pokemon. 

Under Evolution tab, we are showing evolution of Pokemon and highlighting the pokemon which user selected and 
every card in Evolution is clickable and clicking on card navigates to respective Pokemon detail view page.

We have used ActivatedRoute to get id of pokemon from URl and router to navigate to detail page.

We have used multiple Rxjs operators in functionalities and we have used data binding, property binding, 
directives, routing, pipes, dependency injection, ViewChild, parent-child communications and many.

We have done unit testing and written unit test cases.