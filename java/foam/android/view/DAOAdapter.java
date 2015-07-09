package foam.android.view;

import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.ViewGroup;

import foam.core.DAO;
import foam.core.DAOException;
import foam.core.DAOInternalException;
import foam.core.FindSink;
import foam.core.HasX;
import foam.core.MLang;
import foam.core.X;

/**
 * {@link RecyclerView.Adapter} for use with {@link RecyclerView}s of a {@link DAO}.
 */
public class DAOAdapter extends RecyclerView.Adapter<DAOAdapter.DAOViewHolder> implements HasX {
  private DetailViewFactory viewFactory;
  private DAO dao;
  private X x;
  public X X() {
    return x;
  }
  public void X(X x) {
    this.x = x;
  }

  public DAOAdapter(X x, DAO dao, DetailViewFactory viewFactory) {
    X(x);
    this.dao = dao;
    this.viewFactory = viewFactory;
  }

  @Override
  public int getItemCount() {
    try {
      MLang.CountSink sink = MLang.COUNT();
      dao.select(X(), sink);
      return (int) sink.getCount();
    } catch(DAOInternalException e) {
      Log.e("DAOAdapter", "DAOInternalException while trying to fetch COUNT");
    } catch(DAOException e) {
      Log.e("DAOAdapter", "DAOException while trying to fetch COUNT");
    }
    return 0;
  }

  @Override
  public DAOViewHolder onCreateViewHolder(ViewGroup parent, int position) {
    return new DAOViewHolder(viewFactory.create(parent));
  }

  @Override
  public void onBindViewHolder(DAOViewHolder holder, int position) {
    FindSink sink = new FindSink();
    try {
      dao.limit(1).skip(position).select(X(), sink);
    } catch(DAOException e) {
      Log.e("DAOAdapter", "DAOException while trying to bind a view.");
      return;
    } catch(DAOInternalException e) {
      Log.e("DAOAdapter", "DAOInternalException while trying to bind a view.");
      return;
    }
    holder.viewBridge.getValue().set(sink.getValue());
  }

  class DAOViewHolder extends RecyclerView.ViewHolder {
    public final ViewBridge viewBridge;
    public DAOViewHolder(ViewBridge itemView) {
      super(itemView.getView());
      viewBridge = itemView;
    }
  }
}
