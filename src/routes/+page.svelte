<script lang="ts">
  import LandValues from '$lib/components/LandValues.svelte';
  import ParcelComparison from '$lib/components/ParcelComparison.svelte';
</script>

<article class="blog">

  <h1>Democratic Land Tax Valuation</h1>

  <p class="lead">
Real Estate prices have climbed out of reach for young people in almost all cities in advanced economies. Built into the price of real estate is increasingly the cost of the land. Most peoples cultural and instinctual lived experience in the 20th and 21st centuries is that personal living space has been a requirement of adulthood. Thus, those people will pay higher and higher prices for their living space than other expenses. This factor and the financialisation of real estate and most of all land has lead to residents of advanced economy cities to pay X% of their wage on rent and 8x a years wage on buying for their living space.
  </p>

  <p class="lead">
The remedy of shifting taxes on productivity to taxes on natural scarce resources such as land is well documented by Henry George in his 1979 work Progress and Poverty. The attempt in Britain at the beginning of the 20th century to implement his ideas failed due to the challenge of centrally value all the land parcels in the country.
  </p>

  <p class="lead">
The development of the automobile and mass home building programs in the 1920s and 30s caused land to play a small role in amount people payed for their real estate. However the selling off of council homes under the right to buy scheme in the 80s and financial deregulation of the mortgage market in the early 2000s, has lead to, on average, land reaching 62% of the price of buying a house. In addition the distribution of land has become more and more unequal. Even adjusting for the density of urban areas. Thus proposals to tax land akin to Henry George's 18th century proposal are experiencing a comeback in popularity.
  </p>

  <p class="lead">
The question remains how to avoid the mistakes of previous implementations. When ...
  </p>
<ol>
  <li>The land component of real estate is rarely traded directly. We must attempt to model its contribution towards the price of real estate. Individual evaluations cause too much overhead for the government.</li>
  <li>When an owner disagrees with the bad valuation. Their only recourse was to challenge the valuation in the court system causing more pressure on this branch of government.</li>
</ol>
1. 

  <p class="lead">
In response to the first point above, automated evaluation models have appeared. These attempt to combine geographical and market features into a single number modelling the price of the land. In response to the second point, I present in this article a technique to serve as an appeal process for owners of any parcel of land should they wish to dispute a valuation. The technique is inspired by the Somers Valuation method.
  </p>

  <h2>Democratic Land Value Appeal</h2>
All parcels are valued according to an automatic valuation method designed by a team in the government. The map below shows a part of central london with all parcels and their proposed valuation according to a toy model.

<LandValues height="360px" />

  <p class="lead">
Should I wish to trigger the appeal process, local residents near my parcel compare it with several other similary sized parcels in other locations nearby and provide a list from best to worse of the parcels.
The voting local resident isn't told which parcel is up for appeal.
Below is an draft interface showing how the question would be posed and then answered.
  </p>


<ParcelComparison height="360px" />

  <p class="lead">
After a time period of 30 days, voting ends and the ordering submitted by voters are aggregated into a "consensus" order. The new valuation of the property is computed by appropriately weighting the values of the other considered parcels under the current automatic valuation method. See below for an example method:
  </p>

  <p class="lead">
[Example Aggregation Method]
  </p>

  <h2>Comments</h2>

  <p class="lead">
The front facing question being posed to the voter is intended to be open ended. Many people will judge this question based on where they would most like to live. However many others might consider this question from a business or charitable perspective. The idea is that having a collection of different views on the appropriate "use" of the parcel in some way is balanced by the different perspectives of the voters.
  </p>

  <p class="lead">
Who is allowed to vote is also an important question. My solution is to allow the vote to anyone within 500 parcels of any of the parcels being compared with the caveat that if you are within 50 parcels of any of the parcels being compared you should not be allowed to vote. This has the following properties:
  </p>

<ol>
  <li>Knowledge about the locations being compared is local. This gives more weight to the votes of residents.</li>
  <li>Nobody that is a close neighbour of the parcel being considered is allowed to vote. This reduces the likelihood that neighbourly relationships in some way might influence the voting.</li>
  <li>Any distance approach to determine who can vote will need to have different cutoffs depending on if your in an urban environment or in the countryside. Using parcels keeps the decision problem uniform accross different densities of parcels.</li>
</ol>

  <p class="lead">
Another question is how should the parcels used to compare with the appealed parcel be chosen? My solution is that the 600 closest parcels should be sorted by area and the closest 30 parcels in area to the appealed parcel should be randomly sampled down to 6. TODO need to this about this.
  </p>

  <p class="lead">
If we assume the total revenue raised by the tax is fixed per year and revenue is collected proportionally based on the land valuation, if my parcel goes **up** in value after an appeal, then other local residents who have the right to vote on my appeal through the process described above will see a very minor decrease in their yearly land value tax bill. Thus, knowing which parcel is being evaluated allows a voter to lower their tax bill by always voting the appealed parcel at the top of their list. As such we do not tell the voter which parcel is being appealed. It would not be in the interest of the appealer to reveal which parcel is theirs because then that would allow the gamified behaviour described above.
  </p>

  <p class="lead">
As this process evolves, the valuations discovered by the Democratic Land Value Appeal process may deviate from the automatic valuation model significantly. If this is the case then it is my view that the team developing this model should respect the location ordering provided by voters as much as possible. Any deviations from voters opinions should be yearly published.
  </p>

</article>

<style>
  .blog {
    max-width: 72ch;
    margin: 3rem auto;
    padding: 0 1rem;
    line-height: 1.6;
  }

  .lead {
    font-size: 1.125rem;
    color: #444;
  }

  h1, h2 {
    line-height: 1.25;
  }

  h2 {
    margin-top: 2.5rem;
  }
</style>
